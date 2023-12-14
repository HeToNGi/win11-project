import { useEffect, useMemo, useState } from 'react';
import { get } from '../../../util/axios';
// import anime from 'animejs';
// import { useSelector } from 'react-redux';
import './style/games.css';
import Slider from './Slider';
function Games() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    get('http://localhost:8080/store_slider?type=games').then(res => {
      setSliderList(res.data);
    });
  }, [])
  return (
    <div className='store_category_content'>
      <Slider list={sliderList} />
    </div>
  );
}

export default Games;
