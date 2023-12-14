import { useEffect, useState } from 'react';
import '../style/cardSlider.css';
// import DescCard from './DescCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

function CardSlider({list, height, slidesPerView, Card}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!list) return;
    setData(list)
  }, [list])
  return (
    <div className='card_slider' style={{height: height || '200px'}}>
      <Swiper
        spaceBetween={20}
        slidesPerView={slidesPerView || 3}
      >
        {
          data.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Card data={item} index={i} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  );
}

export default CardSlider;
