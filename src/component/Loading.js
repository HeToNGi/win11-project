import { useEffect } from 'react';
import '../style/Loading.css';
import anime from 'animejs';

function Loading() {

  useEffect(()=> {
    for (let i = 1; i <= 4; i++) {
      anime({
        targets: '.item_'+i,
        scale: 1.2,
        direction: 'alternate',
        delay: i * 500,
        duration: 500,
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }, []);
  return (
    <div className='loading_class'>
      <img src='/loading.svg'/>
    </div>
  );
}

export default Loading;
