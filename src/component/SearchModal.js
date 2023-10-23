import { useState, useEffect, useRef } from 'react';
import '../style/SearchModal.css';
import anime from 'animejs';

function SearchModal({ show }) {
  useEffect(()=> {
    anime({
      targets: '.search_content',
      bottom: show ? '60px' : '-30px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
  }, [show]);
  return (
    <div data-blur_close_key="CHANGE_SEARCH_SHOW" style={{display: show ? 'block' : 'none'}} className='search_content'>
    </div>
  );
}

export default SearchModal;
