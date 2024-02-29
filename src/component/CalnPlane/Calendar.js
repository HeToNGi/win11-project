import { useEffect, useMemo, useState } from 'react';
import './Calendar.css';
import LunarCalendar from 'lunar-calendar';
import { useSelector } from 'react-redux';
// import moment from 'moment';

export default function () {
  // const time = useSelector(s => s.time);
  const now = new Date();
  const time = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  }
  const activeColor = useSelector((state) => state.themes.activeColor);
  const [data, setData] = useState({});

  useEffect(() => {
    const date = LunarCalendar.calendar(time.year, time.month, true);
    setData(date)
  }, []);
  const getStyle = (date) => {
    const style = {};
    if (date.year === time.year && date.day === time.day && date.month === time.month) {
      style.background = activeColor;
      style.color = '#fff';
    }
    if (date.month !== time.month) {
      style.opacity = 0.5
    }
    return style;
  }
  return (
    <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='calendar_content'>
      <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='calendar_header'>
        <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='calendar_header_top'>{time.year}年{time.month}月</div>
        <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='calendar_header_bottom'>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周日</div>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周一</div>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周二</div>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周三</div>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周四</div>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周五</div>
          <div data-blur_close_key="CHANGE_CALNTOGG_SHOW">周六</div>
        </div>
      </div>
      <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='calendar_body'>
        {data.monthData ? data.monthData.map((date, i) => {
          return <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" key={i} style={getStyle(date)} className={`${date.year === time.year && date.day === time.day && date.month === time.month ? '' : 'hoverBackground_2'} calendar_item`}>{date.day}</div>
        }) : ''}
      </div>
    </div>
  )
}
