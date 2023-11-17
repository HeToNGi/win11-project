import { useEffect, useMemo, useState } from 'react';
import './Login.css';
import anime from 'animejs';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Upload } from 'antd';
import defaultAvter from './assets/defaultAvter.svg';
import { post, get } from './util/axios';
function Login() {
  const desktop_background_image = useSelector((state) => state.themes.desktop_background_image);
  const showLogin = useSelector((state) => state.showLogin);
  const userInfo = useSelector((state) => state.user_info);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    if (showLogin) {
      anime({
        targets: '.login_class',
        opacity: 1,
        zIndex: 5,
        easing: 'easeInOutExpo',
        duration: 500,
      }).play();
    } else {
      anime({
        targets: '.login_class',
        opacity: 0,
        easing: 'easeInOutExpo',
        duration: 500,
        complete: () => {
          document.getElementById('login').style.zIndex = 0;
        }
      }).play();
    }
  }, [showLogin]);

  const onLogin = () => {
    if (!window.socket_rs) {
      post('/win11_login', {user_name: userName}).then(res => {
        const {win11_user_name, win11_telephone_number, win11_avatar_img, user_name, telephone_number, avatar_img} = res.data;
        dispatch({type: 'CHANGE_USER_INFO', value: {
          avatar_img: win11_avatar_img || (avatar_img || defaultAvter),
          user_name: win11_user_name || user_name,
          telephone_number: win11_telephone_number || telephone_number
        }});
        get('/contacts', {user_name: userName}).then(res => {
          if (res.code === 0) {
            // setContacts(res.data);
            dispatch({type: 'CHANGE_USER_INFO', value: {
              contacts: res.data.map(d => {
                if (!d.avatar_img) d.avatar_img = defaultAvter;
                return d; 
              })
            }});
          }
        })
        window.socket_rs = new WebSocket('ws://152.136.52.163:8081/', win11_telephone_number); // 或者使用 wss:// for secure connections
        window.socket_rs.addEventListener('open', (event) => {
          dispatch({type: 'CHANGE_LOGIN', value: false});
        });
      });
    } else {
      dispatch({type: 'CHANGE_LOGIN', value: false});
    }
  }
  const onInputChange = (e) => {
    setUserName(e.target.value);
  }
  return (
    <div id='login' className='login_class' style={{backgroundImage: `url(${desktop_background_image})` }}>
      <div className='login_content'>
        <div>
          <div className="avter_class">
            <img src={userInfo.avatar_img || defaultAvter} />
          </div>
          {useMemo(() => {
            if (userInfo.user_name) {
              return <div>{userInfo.user_name}</div>
            } else {
              return <input className='username_input' onChange={onInputChange}></input>
            }
          }, [userInfo])}
          <Button onClick={onLogin} type="primary">Sign in</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
