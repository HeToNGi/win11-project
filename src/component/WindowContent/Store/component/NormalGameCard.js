import { useEffect, useState } from 'react';
// import anime from 'animejs';
import '../style/normalGameCard.css';
import { StarFilled } from '@ant-design/icons';
function NormalGameCard({data}) {
  return (
    <div className='normal_game_card card_content'>
      {data.gamePassBadge ? <div className='game_pass'>{data.gamePassBadge}</div> : '' }
      <div className='normal_game_card_image' style={{backgroundImage: `url(${data.img})`}}></div>
      <img className='normal_game_card_img' src={data.img} />
      <div className='normal_game_card_title'>{data.title}</div>
      <div className='normal_game_card_rapr'>
        <span className='normal_game_card_rating'>{data.rating}<StarFilled /></span>
        <span className='normal_game_card_price'>{data.price.includes('%') ? '$' + data.price.split('$')[2] : data.price }</span>
      </div>
    </div>
  );
}

export default NormalGameCard;
