import { useEffect, useMemo, useState } from 'react';
import { get } from '../../../util/axios';
import { Col, Row } from 'antd';
import { StarFilled, RightOutlined } from '@ant-design/icons';
import ProductCollectionCard from './component/ProductCollectionCard';
import CardSlider from './component/CardSlider';
import NormalCard from './component/NormalCard';
import DescCard from './component/DescCard';
import NormalGameCard from './component/NormalGameCard';
import DescGameCard from './component/DescGameCard';
import TitleButton from './component/TitleButton';

// import anime from 'animejs';
import { useSelector } from 'react-redux';
import './style/home.css';
import Slider from './Slider';

let t = null;
function Home() {
  const [sliderList, setSliderList] = useState([]);
  const [homeApps, setHomeApps] = useState({});
  const [homeGames, setHomeGames] = useState({});
  const [homeMovies, setHomeMovies] = useState({});
  const [trendingCollectionsList, setTrendingCollectionsList] = useState([]);
  const [trendingCollectionsSelect, setTrendingCollectionsSelect] = useState('apps');
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  useEffect(() => {
    if (t) return;
    t = setTimeout(() => {
      get('/store_slider?type=home').then(res => {
        setSliderList(res.data);
      });
      get('/store_apps?type=home').then(res => {
        setHomeApps(res.data);
      });
      get('/store_games?type=home').then(res => {
        setHomeGames(res.data);
      });
      get('/store_movies?type=home').then(res => {
        setHomeMovies(res.data);
      });
      clearTimeout(t)
      t = null;
    }, 100)
  }, [])
  useEffect(() => {
    if (trendingCollectionsSelect === 'games' && homeGames.top_grossing_game) {
      setTrendingCollectionsList(homeGames.top_grossing_game);
      return;
    }
    if (trendingCollectionsSelect === 'apps' && homeApps.essential) {
      setTrendingCollectionsList(homeApps.essential);
      return;
    }
    if (trendingCollectionsSelect === 'movies' && homeMovies.new_movies) {
      setTrendingCollectionsList(homeMovies.new_movies);
      return;
    }
  }, [trendingCollectionsSelect, homeApps, homeGames, homeMovies])
  return (
    <div className='store_category_content'>
      <Slider list={sliderList} />
      <div style={{ background: backgroundColor_2 }} className='card_content trending_collections_home'>
        <div className='trend_coll_top'>
          <TitleButton title={useMemo(() => {
              if (trendingCollectionsSelect === 'apps') {
                return 'Essential apps'
              }
              if (trendingCollectionsSelect === 'games') {
                return '最畅销的游戏'
              }
              if (trendingCollectionsSelect === 'movies') {
                return 'New Movies'
              }
            }, [trendingCollectionsSelect])} />
          <div className='trend_coll_top_menu'>
            <div onClick={() => {setTrendingCollectionsSelect('apps')}} className={ trendingCollectionsSelect === 'apps' ? 'active' : ''}>应用</div>
            <div onClick={() => {setTrendingCollectionsSelect('games')}} className={ trendingCollectionsSelect === 'games' ? 'active' : ''}>游戏</div>
            <div onClick={() => {setTrendingCollectionsSelect('movies')}} className={ trendingCollectionsSelect === 'movies' ? 'active' : ''}>电影和电视</div>
          </div>
        </div>
        <div className='trend_coll_content'>
          <Row gutter={[24, 24]}>
            {trendingCollectionsList.map((item, i) => {
              const price = item.price.includes('%') ? item.price.split('$') : item.price;
              return (
                <Col key={i} className="gutter-row" span={8}>
                  <div className='trend_coll_item hoverBackground_2' key={i}>
                    <span className='trend_coll_item_index'>{i+1}</span>
                    <img src={item.img} />
                    <div className='trend_coll_item_right'>
                      <span className='trend_coll_item_title'>{item.title}</span>
                      <div className='trend_coll_item_rating'>
                        {item.rating}
                        <StarFilled />
                      </div>
                      {
                        !price[0].includes('%') ?
                        <span style={{ background: backgroundColor_1 }} className='trend_coll_item_price'>{price}</span> :
                        <div className='price_content'>
                          <div className='discount'>{price[0]}</div>
                          <div style={{ background: backgroundColor_1 }} className='strikethrough_price'>
                            <span>${price[1]}</span>
                            ${price[2]}
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
      <div className='speace' />
      <ProductCollectionCard
        content={
          <CardSlider height={'300px'} slidesPerView={8} Card={NormalCard} list={homeApps.productivity} />
        }
        title="Productivity apps"
      />
      <div className='speace' />
      <ProductCollectionCard
        content={
          <CardSlider height={'300px'} slidesPerView={8} Card={NormalCard} list={homeApps.musice_streaming} />
        }
        title="Music stearming apps"
      />
      <div className='speace' />
      <ProductCollectionCard
        content={
          <CardSlider height={'300px'} slidesPerView={3} Card={DescCard} list={homeApps.creativity} />
        }
        title="Creativity apps"
      />
      <div className='speace' />
      <ProductCollectionCard
        content={
          <CardSlider height={'400px'} slidesPerView={8} Card={NormalGameCard} list={homeGames.new_notavlepc} />
        }
        title="New & Notavle PC games"
      />
      <div className='speace' />
      <ProductCollectionCard
        content={
          <CardSlider height={'400px'} slidesPerView={3} Card={DescGameCard} list={homeGames.weekly_deal} />
        }
        title="Weekly Deal"
      />
      <div className='speace' />
      <ProductCollectionCard
        content={
          <CardSlider height={'400px'} slidesPerView={8} Card={NormalGameCard} list={homeMovies.new_movies} />
        }
        title="New Movies"
      />
    </div>
  );
}

export default Home;
