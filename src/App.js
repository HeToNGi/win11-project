import { useEffect, useState } from 'react';
import './App.css';
import DesktopApp  from './component/DesktopApp';
import Footer from './component/Footer';
import WindowApp from './component/WindowApp';
import anime from 'animejs';
import { useSelector, useDispatch } from 'react-redux';
import { modalMap } from './util/constant';

function App() {
  const [focusApp, setFocusApp] = useState(null);
  const desktopApplications = useSelector(s => {
    const arr = [];
    const desktop_applications = s.desktop_applications;
    for (let k in desktop_applications) {
      if (desktop_applications[k].desktopShortcut) {
        arr.push(desktop_applications[k]);
      }
    }
    return arr;
  });
  const modalShowMap = useSelector((state) => state.modal_show_map);
  const themeName = useSelector((state) => state.themes.name);
  const desktop_background_image = useSelector((state) => state.themes.desktop_background_image);
  const dispatch = useDispatch();
  const desktopAppMouseDown = (e) => {
    if (e.target.getAttribute('needscale')) {
      setFocusApp(e.target);
      anime({
        targets: [e.target],
        scale: '0.5',
        duration: 200,
        easing: 'easeInOutQuad'
      }).play();
    }
  }
  const desktopAppMouseUp = (e) => {
    if (focusApp) {
      anime({
        targets: [focusApp],
        scale: '1',
        duration: 200,
        easing: 'easeInOutQuad'
      }).play();
    }
    setFocusApp(null);
  }

  // 桌面被点击，任何部位
  const onDisktopClick = (e) => {
    const key = e.target.dataset.blur_close_key;
    if (e.target) {
      for (var m in modalMap) {
        const { type, valueKey, noBlur } = modalMap[m];
        if (type === key || !modalShowMap[valueKey] || noBlur) continue;
        dispatch({ type: type, value: false });
      }
    }
  }
  return (
    <div onClick={onDisktopClick} onMouseDown={desktopAppMouseDown} onMouseUp={desktopAppMouseUp} className={`App ${themeName}`} style={{backgroundImage: `url(${desktop_background_image})`}}>
      <div className='desktop_class'>
        <div className='desktop_cont'>
          {desktopApplications.map((app, i) => {
            return <DesktopApp key={i} appIcon={app} />
          })}
        </div>
        <WindowApp />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
