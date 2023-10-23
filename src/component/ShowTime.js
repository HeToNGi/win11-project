import { Fragment } from 'react';
import { useSelector } from 'react-redux';

function ShowTime() {
  const time = useSelector(s => s.time);
  return (
    <Fragment>
      <div>2:42:{time.seconds}</div>
      <div>{time.year}/{time.month}/{time.day}</div>
      {
      // <div>{time.hours}:{time.minutes}:{time.seconds}</div>
      // <div>{time.year}/{time.month}/{time.day}</div>
      }
    </Fragment>
  )
}

export default ShowTime;
