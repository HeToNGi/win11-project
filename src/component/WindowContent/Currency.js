// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import '../../style/Currency.css'
function Currency({parameter}) {
  const { src } = parameter;
  return (
    <div className='currency_content'>
      <iframe src={src} />
    </div>
  );
}

export default Currency;
