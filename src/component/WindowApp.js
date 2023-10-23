import { useEffect, useState, Fragment, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import '../style/WindowApp.css';
import Settings from './WindowContent/Settings';
import Explorer from './WindowContent/Explorer';
import Google from './WindowContent/Google';
import Store from './WindowContent/Store';
import Window from './Window'

function WindowApp() {
  const windowApps = useSelector((state) => state.window_apps);
  const [windowAppList, setWindowAppList] = useState([]);
  const con = (appName) => {
    switch(appName) {
      case 'settings': return <Settings />;
      case 'explorer': return <Explorer />;
      case 'google': return <Google />;
      case 'store': return <Store />;
      default: return ''
    }
  }
  useEffect(() => {
    let a = [];
    for (let k in windowApps) {
      a.push(windowApps[k]);
    }
    setWindowAppList(a);
  }, [windowApps])
  return (
    <Fragment>
      {windowAppList.map(w => {
        return <Window key={w.appName} app={con(w.appName)} appName={w.appName}></Window>
      })}
    </Fragment>
  );
}

export default WindowApp;
