import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover } from 'antd'
import '../style/Window.css';
import anime from 'animejs';
import { layoutMap, layoutproMap } from '../util/constant'
import { MinusOutlined, BorderOutlined, SwitcherOutlined, CloseOutlined } from '@ant-design/icons';

function Window({appName, app}) {
  const windowAppData = useSelector((state) => state.window_apps[appName]) || {};
  const zi = useSelector((state) => state.window_apps[appName] ? state.window_apps[appName].zIndex : '')
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const textColor = useSelector((state) => state.themes.textColor);
  const dispatch = useDispatch();
  const [zIndex, setZIndex] = useState(10);

  useEffect(()=> {
    const data = windowAppData;
    setZIndex(windowAppData.zIndex);
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const ad = {
      targets: '#'+data.appName,
      width: data.width,
      height: data.height,
      top: data.top,
      left: data.left,
      opacity: 1,
      easing: 'easeInOutExpo',
      duration: 500,
    }
    if (data.isMax) {
      ad.width = innerWidth + 'px';
      ad.height = 0.95 * innerHeight + 'px';
      ad.top = '0';
      ad.left = '0';
    }
    if (data.status === 0) {
      ad.width = '0';
      ad.height = '0';
      ad.top = innerHeight + 'px';
      ad.left = innerWidth/2 + 'px';
    }
    anime(ad).play();
  }, [windowAppData, zi]);
  const onNarrow = () => {
    dispatch({
      type: 'CHANGE_WINDOW',
      value: {
        appName: windowAppData.appName,
        status: 0,
      }
    })
  };
  const onMaxMin = () => {
    dispatch({
      type: 'CHANGE_WINDOW',
      value: {
        appName: windowAppData.appName,
        isMax: !windowAppData.isMax,
        zIndex: 20,
      }
    })
  }
  const onCloseWindow = () => {
    dispatch({
      type: 'CLOSE_WINDOW',
      value: windowAppData.appName,
    });
  }
  useEffect(() => {
    let isMove = false;
    const win = document.getElementById(windowAppData.appName);
    if (!win) return;
    win.onmousedown = (event) => {
      const ev = event.target;
      if (ev.id !== windowAppData.appName + '_top') return;
      var ol = event.clientX - win.offsetLeft;
      var ot = event.clientY - win.offsetTop;
      setZIndex(21);
      document.onmousemove = (e) => {
        isMove = true;
        let t = e.clientY - ot;
        let l = e.clientX - ol;
        win.style.top = t + 'px'
        win.style.left = l + 'px'
      }
    };
    win.onmouseup = (event) => {
      document.onmousemove = null;
      const ev = event.target;
      if (ev.id !== windowAppData.appName + '_top') return;
      dispatch({
        type: 'CHANGE_WINDOW',
        value: {
          appName: windowAppData.appName,
          zIndex: 20,
          top: isMove ? win.style.top : windowAppData.top,
          left: isMove ? win.style.left : windowAppData.left,
        }
      })
      isMove = false;
    };
  }, [windowAppData]);

  const onLayoutClick = (name) => {
    if (!layoutproMap[name]) return;
    const { width, height, top, left } = layoutproMap[name];
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    dispatch({
      type: 'CHANGE_WINDOW',
      value: {
        appName: windowAppData.appName,
        zIndex: 20,
        width: width * innerWidth + 'px',
        height: height * innerHeight + 'px',
        top: top * innerHeight + 'px',
        left: left * innerWidth + 'px',
        isMax: false,
      }
    })
  }

  const renderLayoutSelect = () => {
    return (
      <div id={`window_layout_select_${windowAppData.appName}`} className='window_layout_select'>
        {layoutMap.map(l => {
          return (
            <div key={l.name} className='layout_select_outer'>
              {l.childer.map(c => {
                return (
                  <div key={c.name} onClick={() => {onLayoutClick(c.name)}} style={{...c}}>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div id={windowAppData.appName} style={{zIndex: zIndex, background: backgroundColor_1, color: textColor}} className='window_content dpShad'>
      <div id={`${windowAppData.appName}_top`} className='window_top_info'>
        <div className='window_icon'>
          <img src={windowAppData.icon} />
          {windowAppData.title}
        </div>
      </div>
      <div className='operation_group_class'>
        <div onClick={onNarrow} className='operation_class hoverBackground_2'>
          <MinusOutlined />
        </div>
        <Popover placement="bottom" arrow={false} content={renderLayoutSelect} title="">
          <div onClick={onMaxMin}  className='operation_class hoverBackground_2'>
            {windowAppData.isMax ? <SwitcherOutlined /> : <BorderOutlined /> }
          </div>
        </Popover>
        <div onClick={onCloseWindow} className='operation_class hoverBackground_2'>
          <CloseOutlined />
        </div>
      </div>
      <div style={{width: '100%', height: 'calc(100% - 40px)'}}>
        {app}
      </div>
    </div>
  );
}

export default Window;
