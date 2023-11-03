import { useState, useEffect } from 'react';
import '../style/WidgetModal.css';
import anime from 'animejs';
import { get } from '../util/axios.js';

function WidgetModal({ show }) {
  const [newsList, setNewsList] = useState([])
  useEffect(()=> {
    anime({
      targets: '.widget_content',
      left: show ? '20px' : '-800px',
      duration: 1000
    }).play();
  }, [show]);
  useEffect(() => {
    get('/news').then((res) => {
      const arr = [];
      let count = 1;
      if (res.data && res.data.length) {
        while(res.data.length) {
          arr.push(res.data.splice(0, count))
          count =  Math.floor(Math.random() * 2) + 1;
        }
        setNewsList(arr);
      }
    })
  }, [])
  const onNewsClick = (n) => {
    console.log(n.title)
  }
  return (
    <div data-blur_close_key="CHANGE_WIDGET_SHOW" className='widget_content'>
    <div data-blur_close_key="CHANGE_WIDGET_SHOW" className='news_content hiddeScroll'>
      <div data-blur_close_key="CHANGE_WIDGET_SHOW" className='time_widget'>
        11:40 AM
      </div>
        {newsList.map((n, index) => {
          return (
            <div data-blur_close_key="CHANGE_WIDGET_SHOW" key={index} className='new_card_col'>
              {
                n.map((ele, index) => {
                  return (
                    <div key={index} data-blur_close_key="CHANGE_WIDGET_SHOW" className={`new_card_item ${n.length > 1 ? 'new_card_item_2' : 'new_card_item_1'}`} style={{ 'backgroundImage': 'url('+ ele.img +')'}}>
                      <div data-blur_close_key="CHANGE_WIDGET_SHOW" onClick={() => {onNewsClick(ele)}} className='new_title'>
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
