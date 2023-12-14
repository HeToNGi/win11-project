import { useEffect, useMemo, useState } from 'react';
import { get } from '../../../util/axios';
// import anime from 'animejs';
// import { useSelector } from 'react-redux';
import './style/apps.css';
import Slider from './Slider';
function Apps() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    get('/store_slider?type=apps').then(res => {
      setSliderList(res.data);
    });
  }, [])
  return (
    <div className='store_category_content'>
      <Slider list={sliderList} />
    </div>
  );
}

export default Apps;
