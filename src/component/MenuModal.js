import { useState, useEffect, useRef } from 'react';
import '../style/MenuModal.css';
import anime from 'animejs';

function MenuModal({ show }) {
  useEffect(()=> {
    anime({
      targets: '.menu_content',
      bottom: show ? '60px' : '-30px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
  }, [show]);
  return (
    <div data-blur_close_key="CHANGE_MENU_SHOW" style={{display: show ? 'block' : 'none'}} className='menu_content'>
    </div>
  );
}

export default MenuModal;
