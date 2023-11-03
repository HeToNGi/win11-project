// import { useEffect, useState } from 'react';
// import anime from 'animejs';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import '../../style/Google.css'
import left from '../../assets/google/left.svg';
import right from '../../assets/google/right.svg';
import refsh from '../../assets/google/refsh.svg';
import home from '../../assets/google/home.svg';
import index from '../../assets/google/index.svg';
import { get } from '../../util/axios';
import { CloseOutlined } from '@ant-design/icons';

function Google({parameter}) {
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const onSrcInputChange = (e) => {
    setInputSrc(e.target.value);
  };
  useEffect(() => {
    const { src } = parameter;
    setInputSrc(src || '');
    setCurrentSrc(src || '');
  }, [parameter]);
  const [inputSrc, setInputSrc] = useState('');
  const [currentSrc, setCurrentSrc] = useState('');
  const [srcList, setSrcList] = useState([]);
  const [collectionList, setCollectionList] = useState([{
    title: 'Google',
    icon: 'https://www.google.com/favicon.ico',
    src: 'https://www.google.com/webhp?igu=1',
  }, {
    title: 'Bing',
    icon: 'https://bing.com/favicon.ico',
    src: 'https://bing.com',
  }]);
  useEffect(() => {
    if (currentSrc) {
      get('/get_title_icon?src=' + currentSrc).then(res => {
        const { title, icon } = res.data;
        if (srcList.findIndex(s => s.src === currentSrc) === -1) {
          setSrcList([...srcList, {title, icon, src: currentSrc}]);
        }
      })
    }
  }, [currentSrc]);
  const onLabelClick = (src) => {
    setInputSrc(src);
    setCurrentSrc(src)
  }
  const onLabelClose = (src) => {
    let sl = srcList.filter(s => s.src !== src);
    setSrcList(sl);
    setInputSrc(sl[0] ? sl[0].src : '');
    setCurrentSrc(sl[0] ? sl[0].src : '');
  }
  const openLael = (src) => {
    setInputSrc(src);
    setCurrentSrc(src)
  }
  return (
    <div className='google_content' style={{background: backgroundColor_2}}>
      <div className='src_list'>
        {srcList.map((s, i) => {
            return (
                <div className="label_item hoverBackground_2" style={currentSrc == s.src ? {background: backgroundColor_2, boxShadow: '0 0 10px #00000040'} : {}} key={i}>
                  {i !== 0 && currentSrc != s.src ? <div className='divider_class'></div> : ''}
                  <div onClick={() => {onLabelClick(s.src)}}>
                    <img src={s.icon} />
                    <span>{s.title}</span>
                  </div>
                  <div className='close_btn' onClick={() => {onLabelClose(s.src)}} style={{background: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 10%, ${backgroundColor_1} 50%, ${backgroundColor_1})`}}>
                    <CloseOutlined style={{ fontSize: '10px' }} />
                  </div>
                </div>
            )
        })}
      </div>
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
          {collectionList.map(((c, i) => {
            return (
              <div key={i} onClick={() => {openLael(c.src)}} className='collection-class'>
                <img src={c.icon} />
                {c.title}
              </div>
            )
          }))}
        </div>
      </div>
      <div className='iframe-content'>
        {srcList.length ? (srcList.map((s, i) => {
            return <iframe className='iframe' key={i} src={s.src} style={{zIndex: s.src === currentSrc ? 2 : 1 }} />
          })) : (
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
