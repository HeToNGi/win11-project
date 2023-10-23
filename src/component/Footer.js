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
  // const time = useSelector(s => s.time);
  const dispatch = useDispatch();
  const onToolbarBtnClick = (toolbarName, type, icon, title) => {
    switch(type) {
      case 'modal':
        const { type, valueKey} = modalMap[toolbarName] || {};
        if (type && valueKey) {
          dispatch({ type, value: !modalShowMap[valueKey] });
        }
        break;
      case 'window':
        windowHandler(toolbarName, icon, title);
        break;
    }
  }
  const windowHandler = (appName, icon, title) => {
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
      const value = {};
      value[appName] = {
        appName,
        status: 1, // 0缩小 1打开
        width: window.innerWidth/2,
        height: window.innerHeight/2,
        top: '200px',
        left: '200px',
        isMax: false,
        zIndex: 20,
        icon: icon,
        title: title,
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
          <ToolbarButton toolbarName='settings' type="window" title="Settings" status={windowApps.settings ? windowApps.settings.status : undefined} icon="/app/settings.png" onToolbarBtnClick={onToolbarBtnClick} />
          <ToolbarButton toolbarName='explorer' type="window" title="Explorer" status={windowApps.explorer ? windowApps.explorer.status : undefined} icon="/app/explorer.png" onToolbarBtnClick={onToolbarBtnClick} />
          <ToolbarButton toolbarName='google' type="window" title="Google" status={windowApps.google ? windowApps.google.status : undefined} icon="/app/google.svg" onToolbarBtnClick={onToolbarBtnClick} />
          <ToolbarButton toolbarName='store' type="window" title="Store"  status={windowApps.store ? windowApps.store.status : undefined} icon="/app/store.png" onToolbarBtnClick={onToolbarBtnClick} />
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
