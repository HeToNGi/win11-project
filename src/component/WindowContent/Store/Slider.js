import { useEffect, useState } from 'react';
import './style/slider.css';
import anime from 'animejs';
let translateX = 0;
let end = 0;
let slider_warp = null
export default function Slider ({list}) {
  const [sliderList, setSliderList] = useState([]);
  const [active, setActive] = useState(2);
  const [pagingList, setPageList] = useState([]);
  useEffect(() => {
    if (!list.length) return;
    slider_warp = document.querySelector('.slider_warp');
    let arr = list;
    end = arr.length - 1;
    arr.unshift(arr[arr.length - 1]);
    arr.unshift(arr[arr.length - 2]);
    arr.push(...arr.slice(2, 7));
    setPageList(arr.slice(2, end + 3));
    setSliderList(arr);
  }, [list])

  const onPrev = () => {
    switchRotation(active - 1);
  }
  const onNext = () => {
    switchRotation(active + 1);
  }
  const switchRotation = (index) => {
    document.querySelector('#slide_2').style.flex = "";
    document.querySelector('#slide_2').style.transition = "flex 0.3s ease-in-out";
    document.querySelector('#slide_'+(end+2)).style.flex = "";
    document.querySelector('#slide_'+(end+2)).style.transition = "flex 0.3s ease-in-out";
    document.querySelector('#slide_1').style.transition = "flex 0.3s ease-in-out";
    document.querySelector('#slide_1').style.flex = "";
    setActive(index);
    translateX = -((index - 2) * 11 + 19.5);
    anime({
      targets: '.slider_warp',
      translateX: translateX + '%',
      easing: 'easeInOutExpo',
      duration: 200,
      complete: () => {
        if (slider_warp && index === end + 3) {
          slider_warp.style.transform = 'translateX(-19.5%)';
          document.querySelector('#slide_2').style.transition = "none";
          document.querySelector('#slide_2').style.flex = "0 0 50%";
          setActive(2);
        }
        if (slider_warp && index === 1) {
          translateX = -((end) * 11 + 19.5);
          slider_warp.style.transform = `translateX(${translateX}%)`;
          document.querySelector('#slide_1').style.transition = "none";
          document.querySelector('#slide_1').style.flex = "0 0 10%";
          document.querySelector('#slide_'+(end+2)).style.transition = "none";
          document.querySelector('#slide_'+(end+2)).style.flex = "0 0 50%";
          setActive(end + 2);
        }
      }
    })
  }
  return (
    <div className='slider_content'>
      <div className='prev_btn btn' onClick={onPrev}></div>
      <div className='next_btn btn' onClick={onNext}></div>
      <div className='page_content'>
        {pagingList.map((item, index) => {
          return <div key={index} onClick={() => {switchRotation(index + 2)}} className={`page_item ${index+2 === active ? 'page_active' : ''}`}></div>
        })}
      </div>
      <div className='slider_outer'>
        <div className='slider_warp'>
          {
            sliderList.map((item, index) => {
              return (
                <div key={index} id={`slide_${index}`} className={`swiper-slide ${index === active ? 'swiper-slide-active' : ''}`}>
                  <img src={item.img} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
