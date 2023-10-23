// import { useState } from 'react';
import '../style/DesktopApp.css';

function DesktopApp({ appIcon }) {
  return (
    <div tabIndex="0" className="dskApp hoverBackground">
      <div className='dskIcon'>
        <img needscale="1" id={`app_icon_${appIcon.appName}`} src={appIcon.icon} />
      </div>
      <div className='appName'>
        {appIcon.appName}
      </div>
    </div>
  );
}

export default DesktopApp;
