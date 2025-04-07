import { useEffect, useState, Fragment, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import '../style/WindowApp.css';
import Settings from './WindowContent/Settings';
import Explorer from './WindowContent/Explorer';
import Google from './WindowContent/Google';
import Store from './WindowContent/Store';
import Window from './Window';
import Currency from './WindowContent/Currency';
import Camera from './WindowContent/Camera';
import FaceTime from './WindowContent/FaceTime';
import MineClearance from './WindowContent/MineClearance';
import NotePod from './WindowContent/NotePod';
import WhitePlan from './WindowContent/WhitePlan';
import MapContent from './WindowContent/MapContent';

function WindowApp() {
  const windowApps = useSelector((state) => state.window_apps);
  const [windowAppList, setWindowAppList] = useState([]);
  const con = (appName) => {
    let parameter = {}
    if (windowApps[appName]) {
      parameter = windowApps[appName].parameter || {};
    }
    switch(appName) {
      case 'settings': return <Settings parameter={parameter} />;
      case 'explorer': return <Explorer parameter={parameter}  />;
      case 'google': return <Google parameter={parameter} />;
      case 'store': return <Store parameter={parameter} />;
      case 'het': return <Currency parameter={parameter} />;
      case 'pokemonfandom': return <Currency parameter={parameter} />;
      case 'camera': return <Camera parameter={parameter} />;
      case 'facetime': return <FaceTime parameter={parameter} />;
      case 'mineClearance': return <MineClearance parameter={parameter} />;
      case 'noted': return <NotePod parameter={parameter} />;
      case 'whiteborad': return <WhitePlan parameter={parameter} />;
      case 'map': return <MapContent parameter={parameter} />;
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
