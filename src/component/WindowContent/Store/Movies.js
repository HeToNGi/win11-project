import { useEffect, useMemo, useState } from 'react';
import { get } from '../../../util/axios';
// import anime from 'animejs';
// import { useSelector } from 'react-redux';
import './style/movies.css';
import Slider from './Slider';
function Movies() {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    get('http://localhost:8080/store_slider?type=movies').then(res => {
      setSliderList(res.data);
    });
  }, [])
  return (
    <div className='store_category_content'>
      <Slider list={sliderList} />
    </div>
  );
}

export default Movies;
