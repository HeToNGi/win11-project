import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../style/ToolbarButton.css';
import anime from 'animejs';

function ToolbarButton({onToolbarBtnClick, toolbarName, icon, blur_close_key, type, status, title}) {
  const windowApp = useSelector((state) => state.window_apps[toolbarName]) || {};
  const zIndex = useSelector((state) => state.window_apps[toolbarName] ? state.window_apps[toolbarName].zIndex : '')
  const activeColor = useSelector((state) => state.themes.activeColor);
  const onClick = () => {
    onToolbarBtnClick && onToolbarBtnClick(toolbarName, type, icon, title);
  }
  useEffect(() => {
    if (type !== 'window') return;
    if (status === undefined) {
      anime({
        targets: `#${toolbarName}_botag`,
        width: '0',
        easing: 'easeInOutExpo',
        duration: 500,
      }).play();      
      return;
    }
    anime({
      targets: `#${toolbarName}_botag`,
      width: status === 1 && zIndex === 20 ? '40%' : '20%',
      easing: 'easeInOutExpo',
      duration: 500,
    }).play();
  }, [windowApp, zIndex])
  return (
    <div blur_close_key={blur_close_key} onClick={onClick} className="toolbtn hoverBackground">
      <img blur_close_key={blur_close_key} needscale="1" src={icon} />
      {type === 'window' ? <div id={`${toolbarName}_botag`} className='btn_bo_tag' style={{background: activeColor}}></div> : ''}
    </div>
  );
}

export default ToolbarButton;
