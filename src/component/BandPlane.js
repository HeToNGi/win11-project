import { useEffect } from 'react';
import '../style/BandPlane.css';
import anime from 'animejs';

function BandPlane({ show }) {
  useEffect(()=> {
    anime({
      targets: '.band_content',
      top: show ? '-110px' : '-80px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
  }, [show]);
  return (
    <div data-blur_close_key="CHANGE_BANDTOGG_SHOW" style={{display: show ? 'block' : 'none'}} className='band_content'>
    </div>
  );
}

export default BandPlane;
