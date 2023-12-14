import { useEffect, useMemo, useState } from 'react';
// import anime from 'animejs';
import { useSelector } from 'react-redux';
// import { StarFilled } from '@ant-design/icons';
import '../style/descGameCard.css';
function DescGameCard({data, index}) {
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  return (
    <div className='desc_game_card card_content'>
      <img src={data.img} className='desc_game_card_img' />
      <div className='desc_game_card_title'>
        {data.title}
      </div>
      <div className='desc_game_card_desc'>
        {data.desc}
      </div>
      <div className='desc_game_card_index'>{index + 1}</div>
    </div>
  );
}

export default DescGameCard;
