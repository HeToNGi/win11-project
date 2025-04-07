import { useState, useEffect } from 'react';
import '../../style/WidgetModal.css';
import anime from 'animejs';
import { get } from '../../util/axios.js';
import Weather from './Weather';
import Time from './Time';
import { useDispatch } from 'react-redux';
import StockPrice from './StockPrice';

function WidgetModal({ show }) {
  const [newsList, setNewsList] = useState([]);
  const dispatch = useDispatch();
  const randomColors = [
    ['#fff0f6', '#ffd6e7'],
  ]
  useEffect(()=> {
    anime({
      targets: '.widget_content',
      left: show ? '20px' : '-800px',
      duration: 1000
    }).play();
  }, [show]);
  useEffect(() => {
    get('/news').then((res) => {
      let data = res.data.map(item => {
        if (!item.img) {
          item.backgroundColorIndex = Math.floor(Math.random() * randomColors.length);
        }
        return item
      });
      data = Array.from(new Map(data.map(item => [item.title, item])).values())
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
      const arr = [];
      let count = 1;
      if (data && data.length) {
        while(data.length) {
          arr.push(data.splice(0, count))
          count =  Math.floor(Math.random() * 2) + 1;
        }
        setNewsList(arr);
      }
    })
  }, [])
  const onNewsClick = (n) => {
    dispatch({
      type: 'OPEN_WINDOW_APP',
      value: {
        appName: 'google',
        width: window.innerWidth + 'px',
        height: 0.95 * window.innerHeight + 'px',
        top: 0,
        left: 0,
        parameter: {
          src: n.url
        }
      },
    });
  }
  const backgroundStyle = (ele) => {
    if (ele.thumbnail_pic_s) {
      return { 'backgroundImage': 'url('+ ele.thumbnail_pic_s +')'}
    } else {
      return { 'background': `linear-gradient(to top, ${randomColors[ele.backgroundColorIndex][0]}, ${randomColors[ele.backgroundColorIndex][1]})`}
    }
  }
  return (
    <div data-blur_close_key="CHANGE_WIDGET_SHOW" className='widget_content'>
    <div data-blur_close_key="CHANGE_WIDGET_SHOW" className='news_content hiddeScroll'>
      <div data-blur_close_key="CHANGE_WIDGET_SHOW" className='time_widget'>
        <Time />
      </div>
      <div className='we_stock_class'>
        <div className='wea_class'>
          <Weather show={show} />
        </div>
        <div className='stock_class'>
          <StockPrice show={show} />
        </div>
      </div>
        {newsList.map((n, index) => {
          return (
            <div key={index} className='new_card_col'>
              {
                n.map(ele => {
                  return (
                    <div key={ele.title} className={`new_card_item ${n.length > 1 ? 'new_card_item_2' : 'new_card_item_1'}`} style={backgroundStyle(ele)}>
                      <div style={!ele.thumbnail_pic_s ? { background: 'none' } : {}} onClick={() => {onNewsClick(ele)}} className='new_title'>
                        {ele.title}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default WidgetModal;
