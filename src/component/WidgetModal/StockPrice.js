import { useEffect, useState } from 'react';
import './index.css';
import { get } from '../../util/axios.js';
import { useDispatch } from 'react-redux';

// 日期弹窗
function StockPrice({ show }) {
  const [stockPrice, setStockPrice] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=> {
    if (!show) return;
    get('/stock_price').then(res => {
      let { data } = res;
      data = data.map(d => {
        if (d.increase.includes('+')) {
          d.up = 1;
        } else {
          d.up = 0;
        }
        return d
      })
      setStockPrice(data)
    })
  }, [show]);
  const onStockClick = () => {
    dispatch({
      type: 'OPEN_WINDOW_APP',
      value: {
        appName: 'google',
        width: window.innerWidth + 'px',
        height: 0.95 * window.innerHeight + 'px',
        top: 0,
        left: 0,
        parameter: {
          src: 'https://gushitong.baidu.com',
        }
      },
    });
  }
  return (
    <div onClick={onStockClick} className='stock_list hiddeScroll'>
      {stockPrice.map((s, i) => {
        return (
          <div key={i} className='stock_item'>
            <div>
              <div className={`order order_${i}`}>{i+1}</div>
              <div>{s.name}</div>
            </div>
            <div>
              <div className='price'>{s.price}</div>
              <div className={`increase ${s.up ? 'increase_up' : 'increase_down'}`}>{s.increase}</div>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default StockPrice;
