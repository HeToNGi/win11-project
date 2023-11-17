import { Fragment } from "react";
import { useSelector } from 'react-redux';
export default function Time() {
  const time = useSelector(s => s.time);
  return (
    <Fragment>
      {time.hours}:{time.minutes} {time.hours >= 12 ? 'PM' : 'AM'}
    </Fragment>
  )
}
