import '../style/Footer.css';
import ToolbarButton from './ToolbarButton';
import WidgetModal from './WidgetModal'
import MenuModal from './MenuModal';
import SearchModal from './SearchModal';
import BandPlane from './BandPlane';
import PanePlane from './PanePlane';
import CalnPlane from './CalnPlane';
import ShowTime from './ShowTime';
import { modalMap } from '../util/constant';
import { Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

function Footer() {
  const textColor = useSelector((state) => state.themes.textColor);
  const modalShowMap = useSelector((state) => state.modal_show_map);
  const windowApps = useSelector((state) => state.window_apps);
  const taskbarApp = useSelector(s => {
    const arr = [];
    const desktop_applications = s.desktop_applications;
    for (let k in desktop_applications) {
      if (desktop_applications[k].taskbar) {
        arr.push(desktop_applications[k]);
      }
    }
    return arr;
  });
  const dispatch = useDispatch();
  const onToolbarBtnClick = (toolbarName, type) => {
    switch(type) {
      case 'modal':
        const { type, valueKey} = modalMap[toolbarName] || {};
        if (type && valueKey) {
          dispatch({ type, value: !modalShowMap[valueKey] });
        }
        break;
      case 'window':
        windowHandler(toolbarName);
        break;
    }
  }
  const windowHandler = (appName) => {
    if (windowApps[appName]) {
      dispatch({
        type: 'CHANGE_WINDOW',
        value: {
          appName: appName,
          status: windowApps[appName].status === 1 && windowApps[appName].zIndex === 20 ? 0 : 1,
          zIndex: windowApps[appName].status === 1 && windowApps[appName].zIndex === 20 ? 10 : 20,
        }
      })
    } else {
      const value = {
        appName,
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
  }
  return (
    <div className='footer' style={{color: textColor}}>
      <Row style={{width: '100%'}}>
        <Col className='footer_left' span={8}>
          <ToolbarButton toolbarName='widget' type="modal" icon="/app/widget.png" onToolbarBtnClick={onToolbarBtnClick} />
        </Col>
        <Col className='footer_center' span={8}>
          <ToolbarButton toolbarName='menu' type="modal" icon="/app/home.png" onToolbarBtnClick={onToolbarBtnClick} />
          <ToolbarButton toolbarName='search' type="modal" icon="/app/search.svg" onToolbarBtnClick={onToolbarBtnClick} />
          {taskbarApp.map(app => {
            return <ToolbarButton key={app.appName} toolbarName={app.appName} type="window" status={windowApps[app.appName] ? windowApps[app.appName].status : undefined} icon={app.icon} onToolbarBtnClick={onToolbarBtnClick} />
          })}
          {Object.keys(windowApps).map(appName => {
            if (taskbarApp.findIndex((i) => i.appName === appName) === -1) {
              const app = windowApps[appName];
              return <ToolbarButton key={app.appName} toolbarName={app.appName} type="window" status={windowApps[app.appName] ? windowApps[app.appName].status : undefined} icon={app.icon} onToolbarBtnClick={onToolbarBtnClick} />
            }
            return ''
          })}
        </Col>
        <Col className='footer_right' span={8}>
          <div onClick={() => {onToolbarBtnClick('bandtogg', 'modal')}} className='footer_more hoverBackground'>
            <BandPlane show={modalShowMap.bandtogg_show} />
            <img src="/app/toTop.svg"  style={{fill: 'red'}}/>
          </div>
          <div onClick={() => {onToolbarBtnClick('panetogg', 'modal')}} className='panetogg_class hoverBackground margin_left_5'>
            <PanePlane show={modalShowMap.panetogg_show} />
            <img src="/app/wifi.svg" />
            <img src="/app/audio3.svg" />
            <img src="/app/battery.svg" />
          </div>
          <div onClick={() => {onToolbarBtnClick('calntogg', 'modal')}} className='taskDate hoverBackground margin_left_5'>
            <ShowTime />
          </div>
        </Col>
      </Row>
      <WidgetModal show={modalShowMap.widget_show} />
      <MenuModal show={modalShowMap.menu_show} />
      <SearchModal show={modalShowMap.search_show} />
      <CalnPlane show={modalShowMap.calntogg_show} />
    </div>
  );
}

export default Footer;
