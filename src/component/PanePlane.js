import { useEffect } from 'react';
import '../style/PanePlane.css';
import anime from 'animejs';

function PanePlane({ show }) {
  useEffect(()=> {
    anime({
      targets: '.pane_content',
      bottom: show ? '60px' : '40px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
  }, [show]);
  return (
    <div data-blur_close_key="CHANGE_PANETOGG_SHOW" style={{display: show ? 'block' : 'none'}} className='pane_content'>
    </div>
  );
}

export default PanePlane;
