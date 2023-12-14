import { useEffect, useMemo, useState } from 'react';
// import anime from 'animejs';
import { useSelector } from 'react-redux';
import { StarFilled } from '@ant-design/icons';
import '../style/normalCard.css';
function NormalCard({data}) {
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  return (
    <div className='normal_card card_content'>
      <div className='normal_card_img'>
        <img src={data.img} />
      </div>
      <div className='normal_card_title'>
        {data.title}
      </div>
      <div className='normal_card_rapr'>
        <span className='normal_card_ra'>{data.rating}<StarFilled /></span>
        <span style={{ background: backgroundColor_1 }} className='normal_card_price'>{data.price}</span>
      </div>
    </div>
  );
}

export default NormalCard;
