import { useEffect, useMemo, useState } from 'react';
import '../../../style/Store.css';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Home';
import Apps from './Apps';
import Games from './Games';
import Movies from './Movies';

function Store() {
  const [category, setCategory] = useState('home');
  const [categoryList, setCategoryList] = useState([{name: 'Home', key: 'home'}, {name: 'Apps', key: 'apps'}, {name: 'Games', key: 'games'}, {name: 'Movies & TV', key: 'movies'}]);
  const activeColor = useSelector((state) => state.themes.activeColor);
  const onCategroyClick = (key) => {
    setCategory(key);
  }
  return (
    <div className='store_content'>
      <div className='store_heard'>
        <img src="https://apps.microsoft.com/assets/icons/microsoft-header-logo-dark.png" className='img_logo_store' />
        <div className='category_select'>
          {categoryList.map((item, index) => {
            return (
              <div className="category_select_item" style={{color: item.key === category ? activeColor : 'inherit'}} key={index} onClick={() => {onCategroyClick(item.key)}}>
                {item.name}
                {item.key === category ? <div className='active_dr' style={{background: activeColor}} /> : ''}
              </div>
            )
          })}
        </div>
        <div className='store_search_outer'>
          <input />
        </div>
      </div>
      {useMemo(() => {
        switch(category) {
          case 'apps':
            return <Apps />;
          case 'games':
            return <Games />;
          case 'movies':
            return <Movies />;
          default:
            return <Home />
        }
      }, [category])}
    </div>
  );
}

export default Store;
