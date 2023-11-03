import { useState, useEffect, Fragment } from 'react';
import '../style/MenuModal.css';
import { useSelector, useDispatch } from 'react-redux';
import anime from 'animejs';
import CustomComponent from './CustomComponent';
import { ALL_APPS } from '../util/constant';
import onoff from '../assets/onoff.svg';
import lock from '../assets/lock.svg';
import shutdown from '../assets/shutdown.svg';
import restart from '../assets/restart.svg';

function MenuModal({ show }) {
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const textColor = useSelector((state) => state.themes.textColor);
  const dispatch = useDispatch();
  const [currentPin, setCurrentPin] = useState('pinned');
  const [allApps, setAllApps] = useState(ALL_APPS);
  function sortAndGroupObjects(arr) {
    arr.sort((a, b) => a.title.localeCompare(b.title)); // 按title属性的字母顺序排序

    const groupedArray = [];
    let tempArray = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
      // 检查是否和上一个对象的title属性的首字母相同
      if (arr[i].title[0] === arr[i - 1].title[0]) {
        tempArray.push(arr[i]);
      } else {
        groupedArray.push(tempArray);
        tempArray = [arr[i]];
      }
    }

    // 将最后一个分组加入二维数组
    groupedArray.push(tempArray);

    return groupedArray;
  }
  const AllAppList = () => {
    const renderRes = sortAndGroupObjects(allApps);
    return (
      <div className='app_list'>
        {renderRes.map((list, index) => {
          return (
            <Fragment key={index}>
              <div className='order'>{list[0].title.charAt()}</div>
              {list.map((item, i) => {
                return (
                  <div className='app_item hoverBackground_2' key={i}>
                    <img src={item.icon} />
                    <span>{item.title}</span>
                  </div>
                )
              })}
            </Fragment>
          )
        })}
      </div>
    )
  }
  AllAppList();
  useEffect(()=> {
    anime({
      targets: '.menu_content',
      bottom: show ? '60px' : '-30px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
    if (!show) {
      anime({
        targets: '.on_off_menu',
        bottom: '-100%',
        opacity: 0,
        easing: 'easeInOutExpo',
        duration: 200,
      }).play();
    }
  }, [show]);

  useEffect(() => {
    anime({
      targets: '.menu_body',
      left: currentPin === 'pinned' ? '0' : '-100%',
      right: currentPin === 'pinned' ? '-100%' : '0',
      easing: 'easeInOutExpo',
      duration: 500,
    }).play();
  }, [currentPin]);

  const checkPin = (key) => {
    setCurrentPin(key);
  }
  const onOffClick = () => {
    anime({
      targets: '.on_off_menu',
      bottom: '103%',
      opacity: 1,
      easing: 'easeInOutExpo',
      duration: 200,
    }).play();
  }
  const openApp = (appName) => {
    dispatch({
      type: 'OPEN_WINDOW_APP',
      value: {
        appName: appName,
        width: window.innerWidth + 'px',
        height: 0.95 * window.innerHeight + 'px',
        top: 0,
        left: 0,
      },
    })
  }
  return (
    <div data-blur_close_key="CHANGE_MENU_SHOW" style={{display: show ? 'block' : 'none', background: backgroundColor_1, color: textColor}} className='menu_content'>
      <div data-blur_close_key="CHANGE_MENU_SHOW" className='menu_body'>      
        <div data-blur_close_key="CHANGE_MENU_SHOW" className='hiddeScroll pinned_class'>
          <div data-blur_close_key="CHANGE_MENU_SHOW" className="stAcbar">
            <span data-blur_close_key="CHANGE_MENU_SHOW">Pinned</span>
            <div data-blur_close_key="CHANGE_MENU_SHOW" onClick={() => {checkPin('allapps')}} style={{background: backgroundColor_2}}>All apps</div>
          </div>
          <div data-blur_close_key="CHANGE_MENU_SHOW" className="pnApps">
            {allApps.map(app => {
              if (app.isPinned) {
                return (
                  <div key={app.title} onClick={() => {openApp(app.appName)}} className='app_content hoverBackground_2'>
                    <img src={app.icon} />
                    <span>{app.title}</span>
                  </div>
                )
              }
            })}
          </div>
          <div data-blur_close_key="CHANGE_MENU_SHOW" className="stAcbar">
            <span data-blur_close_key="CHANGE_MENU_SHOW">Recommended</span>
          </div>
          <div data-blur_close_key="CHANGE_MENU_SHOW" className='recommend_class'>
            {allApps.filter(a => a.isPinned).slice(0, 6).map(app => {
              return (
                <div key={app.title} className='rec_item hoverBackground_2'>
                  <img src={app.icon} />
                  <span>{app.title}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div data-blur_close_key="CHANGE_MENU_SHOW" className='hiddeScroll allapp_class'>
          <div data-blur_close_key="CHANGE_MENU_SHOW" className="stAcbar">
            <span data-blur_close_key="CHANGE_MENU_SHOW" >ALL Apps</span>
            <div data-blur_close_key="CHANGE_MENU_SHOW" onClick={() => {checkPin('pinned')}} style={{background: backgroundColor_2}}>Back</div>
          </div>
          {AllAppList()}
        </div>
      </div>
      <div data-blur_close_key="CHANGE_MENU_SHOW" className='menuBar' style={{ background: backgroundColor_2 }}>
        <div data-blur_close_key="CHANGE_MENU_SHOW" className='user_info'>
          <img data-blur_close_key="CHANGE_MENU_SHOW" src="https://images.unsplash.com/photo-1695765586912-39758d5de97d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcxfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"/>
          <span data-blur_close_key="CHANGE_MENU_SHOW">HeT.</span>
        </div>
        <CustomComponent keyblur="data-blur_close_key" valueblur="CHANGE_MENU_SHOW">
          <div onClick={onOffClick} className='on_off hoverBackground_2'>
            <img src={onoff} />
          </div>
        </CustomComponent>
        <div className='on_off_menu' style={{ background: backgroundColor_2 }}>
          <div className='on_off_item hoverBackground_2'>
            <img src={lock} />
            <span>Lock</span>
          </div>
          <div className='on_off_item hoverBackground_2'>
            <img src={shutdown} />
            <span>Shut Down</span>
          </div>
          <div className='on_off_item hoverBackground_2'>
            <img src={restart} />
            <span>Restart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
