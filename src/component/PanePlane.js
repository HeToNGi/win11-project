import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import anime from 'animejs';

import Slider from '../commonComponent/Slider';
import { BatterySvgIcon } from '../commonComponent/Icon';
import '../style/PanePlane.css';

const PanePlaneList = [
  {
    key: 'WiFi',
    name: 'WiFi',
    defalut_icon: 'wifi.png',
    active_icon: '',
  },
  {
    key: 'Bluetooth',
    name: 'Bluetooth',
    defalut_icon: 'bluetooth.png',
    active_icon: '',
  },
  {
    key: 'FlightMode',
    name: 'Flight Mode',
    defalut_icon: 'airplane.png',
    active_icon: '',
  },
  {
    key: 'BatterySaver',
    name: 'Battery Saver',
    defalut_icon: 'saver.png',
    active_icon: '',
  },
  {
    key: 'Theme',
    name: 'Theme',
    defalut_icon: 'sun.png',
    active_icon: 'moon.png',
  },
  {
    key: 'NightLight',
    name: 'Night Light',
    defalut_icon: 'nightlight.png',
    active_icon: '',
  }
]

function PanePlane({ show }) {

  const tool = useSelector((state) => state.tool);
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const activeColor = useSelector((state) => state.themes.activeColor);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState(50);
  const [brightness, setBrightness] = useState(80)

  useEffect(() => {
    dispatch({ type: 'CHANGE_THEMES', value: tool.Theme ? 'drak_class' : 'light_class' });
  }, [tool.Theme])

  useEffect(()=> {
    anime({
      targets: '.pane_content',
      bottom: show ? '60px' : '40px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
  }, [show]);


  const onClickPaneHandler = (key) => {
    dispatch({ type: 'CHANGE_TOOL', value: key });
  } 
  const onAudioChange = (e) => {
    setAudio(Number(e.target.value))
  }
  const onBrightnessChange = (e) => {
    setBrightness(Number(e.target.value))
  }
  const getAudioUrl = () => {
    let i = 2
    if (audio <= 0) {
      i = 0
    } else if (audio > 0 && audio <= 50){
      i = 1
    } else if (audio > 50 && audio <= 80){
      i = 2
    } else if (audio > 80 && audio <= 100){
      i = 3
    }
    return i
  }
  return (
    <div
      data-blur_close_key="CHANGE_PANETOGG_SHOW"
      style={{display: show ? 'block' : 'none', background: backgroundColor_1}}
      className='pane_content'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='pane_head'>
        <div className='pane_top'>
          {PanePlaneList.map(item => (
            <div
              className='pane_top_item'
              key={item.key}
              onClick={() => onClickPaneHandler(item.key)}
            >
              <div
                className={`pane_top_icon ${!tool.Theme && tool[item.key] || tool.Theme && !tool[item.key]}`}
                style={{ backgroundColor: tool[item.key] ? activeColor : backgroundColor_2 }}
              >
                <img
                  src={require(`../assets/img/icon/${tool[item.key] ? item.active_icon || item.defalut_icon :item.defalut_icon}`)}
                ></img>
              </div>
              <div className='pane_top_name'>{item.name}</div>
            </div>
          ))}
        </div>
        <div className='slider_item'>
          <div className={`slide_icon ${tool.Theme}`}>
            <img src={require(`../assets/img/icon/brightness.png`)}></img>
          </div>
          <Slider value={brightness} onChange={onBrightnessChange}/>
        </div>
        <div className='slider_item'>
          <div className={`slide_icon ${tool.Theme}`}>
            <img src={require(`../assets/img/icon/audio${getAudioUrl()}.png`)}></img>
          </div>
          <Slider value={audio} onChange={onAudioChange} />
        </div>
      </div>
      <div className='pane_footer'>
        <div className={`pane_batter ${tool.Theme}`}>
          <BatterySvgIcon />
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
export default PanePlane;
