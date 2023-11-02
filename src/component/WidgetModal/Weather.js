import { useEffect, useState } from 'react';
import './index.css';
import { get } from '../../util/axios.js';
import { useSelector, useDispatch } from 'react-redux';

// 日期弹窗
function Weather({ show }) {
  const [weather, setWeather] = useState({future_weather: []});
  const dispatch = useDispatch();
  useEffect(() => {
    if (!show) return;
    get('/weather').then(res => {
      const { data } = res;
      if (data && data.hour_weathers) {
        data.hour_weathers = JSON.parse(data.hour_weathers);
      }
      if (data && data.future_weather) {
        data.future_weather = JSON.parse(data.future_weather).slice(0, 4);
        data.future_weather[0].day = '今天';
      }
      setWeather(data)
    });
  }, [show]);
  const onWeatherClick = () => {
    dispatch({
      type: 'OPEN_WINDOW_APP',
      value: {
        appName: 'google',
        width: window.innerWidth + 'px',
        height: 0.95 * window.innerHeight + 'px',
        top: 0,
        left: 0,
        parameter: {
          src: 'http://weather.cma.cn/web/weather/54511.html',
        }
      },
    });
  }
  return (
    <div onClick={onWeatherClick} className='weather_content'>
      <div className='waether_title'>
        <img src={weather.icon} />
        <span>天气</span>
        <div className='loc_class'>
          <img src='/loc.svg'/>
          <span>中国/北京</span>
        </div>
      </div>
      <div className='temperature_class'>
        <div className='temperature_left'>{weather.temperature}</div>
        <div className='temperature_right'>
          <div className='temperature_right1'>
            {weather.weather}
          </div>
          <div className='temperature_right2'>
            <div>
              <img src="/humidity.svg" />
              <span>{weather.humidity}</span>
            </div>
            <div  >
              <img src="/precipitation.svg" />
              <span>{weather.precipitation}</span>
            </div>
            <div  >
              <img src="/wind.svg" />
              <span>{weather.wind}</span>
            </div>
            <div  >
              <img src="/pressure.svg" />
              <span>{weather.pressure}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='fut_class'>
        {weather.future_weather.map((data, i) => {
          return (
            <div key={i} className='fut_item'>
              <img src={data.icon} />
              <div>{data.day}</div>
              <div className='mn_mx_class'>
                <div>{data.temperature[0]}</div>
                <div>{data.temperature[1]}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Weather;
