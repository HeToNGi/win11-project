import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ShowTime() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'UPDATA_TIME'
    })
    setInterval(() => {
      dispatch({
        type: 'UPDATA_TIME'
      })
    }, 60000)
  }, [])
  const time = useSelector(s => s.time);
  return (
    <Fragment>
      <div style={{color: '#eee4e4a1'}}>{time.hours}:{time.minutes} <span>{time.hours >= 12 ? 'PM' : 'AM'}</span></div>
      <div style={{color: '#eee4e4a1'}}>{time.year}/{time.month}/{time.date}</div>
    </Fragment>
  )
}

export default ShowTime;
