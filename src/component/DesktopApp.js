// import { useState } from 'react';
import '../style/DesktopApp.css';
import { useSelector, useDispatch } from 'react-redux';

function DesktopApp({ appIcon }) {
  const dispatch = useDispatch();
  const onAppDoubleClick = (e) => {
    const value = {
      appName: appIcon.appName,
      width: window.innerWidth/2,
      height: window.innerHeight/2,
      top: '200px',
      left: '200px',
    }
    dispatch({
      type: 'OPEN_WINDOW_APP',
      value,
    });
  }
  return (
    <div tabIndex="0" onDoubleClick={onAppDoubleClick} className="dskApp hoverBackground">
      <div className='dskIcon'>
        <img needscale="1" id={`app_icon_${appIcon.title}`} src={appIcon.icon} />
      </div>
      <div className='appName'>
        {appIcon.title}
      </div>
    </div>
  );
}

export default DesktopApp;
