import { useEffect, useState } from 'react';
import '../style/CalnPlane.css';
import anime from 'animejs';
import { useSelector } from 'react-redux';

// 日期弹窗
function CalnPlane({ show }) {
  const time = useSelector(s => s.time);
  useEffect(()=> {
    anime({
      targets: '.caln_content',
      right: show ? '10px' : '-10px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
  }, [show]);
  return (
    <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" style={{display: show ? 'block' : 'none'}} className='caln_content'>
      <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='caln_hearder'>
        {time.month}月{time.date}日 {time.dayString}
      </div>
      <div data-blur_close_key="CHANGE_CALNTOGG_SHOW" className='caln_body'>
        
      </div>
    </div>
  );
}

export default CalnPlane;
