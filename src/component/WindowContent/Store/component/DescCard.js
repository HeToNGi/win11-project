import { useEffect, useMemo, useState } from 'react';
// import anime from 'animejs';
import { useSelector } from 'react-redux';
import { StarFilled } from '@ant-design/icons';
import '../style/descCard.css';
function DescCard({data}) {
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  return (
    <div className='desc_card card_content'>
      <div style={{ background: backgroundColor_1 }} className='desc_card_img'>
        <img src={data.img} />
      </div>
      <div className='desc_card_right'>
        <div className='normal_card_title'>
          {data.title}
        </div>
        <span className='normal_card_ra'>{data.rating}<StarFilled /></span>
        <div className='desc_card_desc'>{data.desc}</div>
      </div>
    </div>
  );
}

export default DescCard;
