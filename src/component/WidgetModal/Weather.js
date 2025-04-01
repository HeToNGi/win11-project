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
      if (data && data.future_weather && data.future_weather.length) {
        data.future_weather = data.future_weather.slice(1, 5)
        data.future_weather[0] ? data.future_weather[0].day = '今天' : '';
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
        {/* <img src={weather.icon} /> */}
        <span>{ weather.weather_icon }天气</span>
        <div className='loc_class'>
          <img src='/loc.svg'/>
          <span>中国/北京</span>
        </div>
      </div>
      <div className='temperature_class'>
        <div className='temperature_left'>{weather.temperature}</div>
        <div className='temperature_right'>
          <div className='temperature_right1'>
            {weather.weather_icon}
          </div>
          <div className='temperature_right2'>
            <div>
              <img src="/humidity.svg" />
              <span>{weather.precipitation_probability}</span>
            </div>
            <div  >
              <img src="/precipitation.svg" />
              <span>{weather.precipitation}</span>
            </div>
            <div  >
              <img src="/wind.svg" />
              <span>{weather.wind_speed}</span>
            </div>
            <div>
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
              <div>{data.weather_icon}</div>
              <div>{data.date}</div>
              <div className='mn_mx_class'>
                <div>{data.max_temp}</div>
                <div>{data.min_temp}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Weather;
