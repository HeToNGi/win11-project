import { useEffect, useState, Fragment, useRef } from 'react';
import '../../../style/Settings.css'
// import '../../index.css'
import anime from 'animejs';
import { optionList, themes } from '../../../util/constant.js'
import { post } from '../../../util/axios.js'
import data from '../../../util/settingsData.json';
import { useSelector, useDispatch } from 'react-redux';
import checkicon from '../../../assets/checkicon.svg';
import microsoft from '../../../assets/microsoft.svg';
const UserInfo = () => {
  const userInfo = useSelector((state) => state.user_info);
  const dispatch = useDispatch();

  // 上传头像
  const onAvatarInputChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件！');
      inputElement.value = ''; // 清空文件选择
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      // 将 imageData 发送到服务器
      post('/change_avatar_img', {
        user_name: userInfo.user_name,
        avatar_img: imageData,
        telephone_number: userInfo.telephone_number,
      }).then((res) => {
        const { avatar_img } = res.data;
        dispatch({type: 'CHANGE_USER_INFO', value: {
          avatar_img: avatar_img,
        }});
      })
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className='hoverBackground_2 setting_userinfo'>
      <div className='avatar_img'>
        <div className='upload_avatar'>
          <img src={checkicon} />
          <input type="file" onChange={onAvatarInputChange} className='avatar_img' accept="image/*" />
        </div>
        <img src={userInfo.avatar_img} />
      </div>
      <div className='userinfo_name'>
        <span className='name'>
          {userInfo.user_name}
        </span>
        <span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          {userInfo.telephone_number}
        </span>
      </div>
    </div>
  )
}
// Local Accenr
// 日期弹窗
function Settings({}) {
  const [selectIndex, setSelectIndex] = useState(0);
  const [currentSelectData, setCurrentSelectData] = useState([]);
  const themeName = useSelector((state) => state.themes.name);
  const activeColor = useSelector((state) => state.themes.activeColor);
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const desktop_background_image = useSelector((state) => state.themes.desktop_background_image);
  const dispatch = useDispatch();
  const setting_right = useRef(null);
  useEffect(() => {
    anime({
      targets: '.select_active',
      top: selectIndex * 38 + 13 + 'px',
      easing: 'easeInOutExpo',
      duration: 200,
    }).play();
  }, [selectIndex]);

  const onOptionClick = (i) => {
    const t1 = document.getElementById(optionList[selectIndex].name);
    t1.style.position = 'static';
    const t = document.getElementById(optionList[i].name);
    anime({
      targets: '#setting_right_body',
      scrollTop: t.offsetTop - 50,
      easing: 'easeInOutExpo',
      duration: 200,
      complete: ()=> {
        t.style.position = 'sticky';
      }
    }).play();
    setSelectIndex(i);
  }
  useEffect(() => {
    const img1 = document.querySelector('#desktop_background_image');
    img1.src = img1.getAttribute('data-src');
    themes.forEach((t) => {
      const img = document.querySelector('#'+t.name);
      img.src = img.getAttribute('data-src');
    });
  }, [])
  useEffect(() => {
    setting_right.current.removeEventListener('wheel', () => {})
    setting_right.current.addEventListener('wheel', () => {
      if (optionList[selectIndex + 1]) {
        const t = document.getElementById(optionList[selectIndex+1].name);
        const t1 = document.getElementById(optionList[selectIndex].name);
        if (t.offsetTop - setting_right.current.scrollTop <= 100) {
          t.style.position = 'sticky';
          t1.style.position = 'static';
          setSelectIndex(selectIndex + 1);
        }
      }
      if (optionList[selectIndex - 1] ) {
        const t = document.getElementById(optionList[selectIndex].name);
        const t1 = document.getElementById(optionList[selectIndex].name);
        if (t.offsetTop - setting_right.current.scrollTop > 100) {
          t.style.position = 'static';
          t1.style.position = 'sticky';
          setSelectIndex(selectIndex - 1);
        }
      }
    })
  }, [selectIndex]);
  useEffect(() => {
    onOptionClick(0);
  }, []);
  const renderTile = (name, ele) => {
    return (
      <div key={name + ele.name} style={{background: backgroundColor_2}} className={ele.type}>
        <span className='setting_icon'>{ele.icon}</span>
        <div>
          <span className='name'>{ele.name}</span>
          <span className='desc'>{ele.desc}</span>
        </div>
        <img src='/settings/right.svg' />
      </div>
    )
  }

  const renderSubHeading = (n, ele) => {
    return (
      <div key={n+ele.name} className={ele.type}>
        {ele.name}
      </div>
    );
  }

  const onChangeThemes = (n) => {
    dispatch({
      type: 'CHANGE_THEMES',
      value: n.name,
    })
  };
  const renderPersonaliseTop = (n, ele) => {
    return (
      <div key={n + ele.type} className='personalise_top'>
        <div className='display_personalise'>
          <img id="desktop_background_image" data-src={desktop_background_image}  alt='desktop_background_image'/>
        </div>
        <div className='themes_content'>
          <div>Select a theme to apply</div>
          <div className='themes_content_them'>
            {themes.map(t => {
              return (
                <div key={t.name} style={{border: themeName === t.name ? `2px solid ${activeColor}` : 'none'}} onClick={() => {onChangeThemes(t)}}>
                  <img id={t.name} data-src={t.desktop_background_image} alt="desktop_background_image" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  };
  const renderSysTop = () => {
    return (
      <div className='systop_content'>
        <div className='systop_left'>
          <div className='systop_them'>
            <img src={desktop_background_image}  alt='desktop_background_image'/>
          </div>
          <div className='systop_left_des'>
            <div>Liber-V</div>
            <div>NS14A8</div>
            <div>Rename</div>
          </div>
        </div>
        <div className='systop_right'>
          <div className='hoverBackground_2'>
            <img src={microsoft} />
            <div className='systop_right_title'>
              <div>Microsoft 365</div>
              <span>View benefits</span>
            </div>
          </div>
          <div className='hoverBackground_2'>
            <img src="/settings/update.svg" />
            <div className='systop_right_title'>
              <div>Windows Update</div>
              <span>You'r up to date</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='setting_content'>
      <div className='setting_left'>
        {UserInfo()}
        <input type="text" style={{background: backgroundColor_2}} className="search" placeholder='Find a setting' name="search" />
        <div className='setting_option hiddeScroll'>
          <div className='select_active' style={{background: activeColor}} />
          {optionList.map((i, index) => {
            return (
              <div onClick={() => {onOptionClick(index)}} className={`option_item hoverBackground_2 ${index === selectIndex && 'option_item_active'}`} key={index}>
                <img src={`/settings/${i.key}.svg`} />
                {i.name}
              </div>
            )
          })}
        </div>
      </div>
      <div className='setting_right'>
        <div id='setting_right_body' ref={setting_right} className='setting_right_body hiddeScroll'>
          {
            optionList.map((o, i) => {
              const d = data[o.name]
              return (
                <Fragment key={i}>
                  <div key={o.name + i} className='setting_right_title' id={o.name} style={{background: backgroundColor_1}}>{o.name}</div>
                  {
                    d.map(ele => {
                      switch (ele.type) {
                        case 'tile': return renderTile(o.name, ele)
                        case "subHeading":
                        case "spacer":
                          return renderSubHeading(o.name, ele);
                        case "personaliseTop":
                          return renderPersonaliseTop(o.name, ele);
                        case "sysTop":
                          return renderSysTop();
                        default: return ''
                      }
                    })
                  }
                </Fragment>
              ) 
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Settings;
