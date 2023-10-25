// import { useEffect, useState } from 'react';
// import anime from 'animejs';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import '../../style/Google.css'
import left from '../../assets/google/left.svg';
import right from '../../assets/google/right.svg';
import refsh from '../../assets/google/refsh.svg';
import home from '../../assets/google/home.svg';
import index from '../../assets/google/index.svg';
function Google({ parameter }) {
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const { src } = parameter;
  const onSrcInputChange = (e) => {
    setInputSrc(e.target.value);
  };
  const [inputSrc, setInputSrc] = useState(src);
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <div className='google_content' style={{background: backgroundColor_2}}>
      <div className='browser-title'>
        <div className='browser-title-top'>
          <img src={left} />
          <img src={right} />
          <img src={refsh} />
          <img src={home} />
          <div className='src-input'>
            <input value={inputSrc} onChange={onSrcInputChange}/>
          </div>
        </div>
        <div className='browser-title-bottom'>
          <div className='collection-class'>
            {
              // https://unsplash.com/
            }
            <img src="https://unsplash.com/favicon-16x16.png" />
            Tranksa,Uklop  
          </div>
          <div className='collection-class'>
            {
              // https://developer.mozilla.org/zh-CN/
            }
            <img src="https://developer.mozilla.org/favicon-48x48.cbbd161b.png" />
            MDN Web Docs
          </div>
        </div>
      </div>
      <div className='iframe-content'>
        {currentSrc ? <iframe className='iframe' src={currentSrc} /> : (
          <div className='borwser-index'>
            <div>
              <img src={index} />
              <div className='input-search'></div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Google;
