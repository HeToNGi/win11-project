import TextArea from 'antd/es/input/TextArea';
import '../../style/NotePod.css';
import { useEffect, useMemo, useState } from 'react';

function NotePad() {
  const [functionButtons, setFunctionButtons ] = useState([{key: 'File'}, {key: 'Edit'}, {key: 'View'}])
  return (
    <div className='notepod_content'>
      <div className='notepod_header'>
        {functionButtons.map(item => {
          return <div className='hoverBackground_2' key={item.key}>{item.key}</div>
        })}
      </div>
      <div className='notepod_body'>
        <textarea />
      </div>
    </div>
  )
}

export default NotePad;
