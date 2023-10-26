import { useCallback, useEffect, useState } from 'react';
import '../style/AIdialogBox.css';
import anime from 'animejs';
import { useSelector } from 'react-redux';
import { post } from '../util/axios.js';
import Loading from './Loading';

function AIdialogBox({ show }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [currentResContent, setCurrentResContent] = useState('');
  const [currentReqContent, setCurrentReqContent] = useState('');
  const [timer, setTimer] = useState(null);
  const [prohibitSending, setProhibitSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const textColor = useSelector((state) => state.themes.textColor);

  useEffect(()=> {
    anime({
      targets: '.aidialog_content',
      bottom: show ? '60px' : '40px',
      opacity: show ? 1 : 0,
      duration: 700,
    }).play();
    if (!show) {
      clearInterval(timer)
      setTimer(null);
      setMessages([]);
      setContent('');
      setCurrentResContent('');
      setCurrentReqContent('');
      setProhibitSending(false);
    }
  }, [show]);

  useEffect(() => {
    const am = document.getElementById('assistant_message');
    const um = document.getElementById('user_message');
    if (am) {
      am.scrollIntoView();
      return;
    }
    if (um) {
      um.scrollIntoView();
    }
  }, [currentResContent, currentReqContent]);

  const send = () => {
    if (prohibitSending || !content) return;
    setProhibitSending(true);
    const m = [...messages];
    m.push({
      role: 'user',
      content,
    });
    setLoading(true);
    setCurrentReqContent(content);
    setContent('');
    post('/wenxinworkshop', {
      messages: m,
    }).then((res) => {
      setLoading(false);
      if (!res.data.result) return;
      const r = res.data.result.split('');
      let count = 0;
      let t = setInterval(() => {
        if (r[count] !== undefined) {
          setCurrentResContent(r.slice(0, count + 1).join(''));
          count++;
        }
        if (count === r.length) {
          clearInterval(t);
          t = null;
          setTimer(null)
          m.push({
            role: 'assistant',
            content: res.data.result
          });
          setMessages(m);
          setCurrentResContent('');
          setCurrentReqContent('');
          setProhibitSending(false);
          return;
        }
      }, 50)
      setTimer(t);
    }).catch((err)=>{
      setLoading(false);
    })
  }
  
  const onTextAreaChange = (e) => {
    setContent(e.target.value);
  }
  return (
    <div data-blur_close_key="CHANGE_AIDIALOGBOX_SHOW" style={{display: show ? 'block' : 'none', background: backgroundColor_1}} className='aidialog_content'>
      <div style={{ background: backgroundColor_2 }} className='show_message_class hiddeScroll'>
        {messages.map((m, i) => {
          if (m.role === 'user') {
            return (
              <div key={i} className='user_message_content'>
                <div>
                  {m.content}
                </div>
              </div>
            )
          }
          return (
            <div key={i} className='assistant_message_content'>
              <div style={{ background: backgroundColor_1, color: textColor }}>
                {m.content}
              </div>
            </div>
          )
        })}
        {currentReqContent ? (
          <div id="user_message" className='user_message_content'>
            <div>
              {currentReqContent}
            </div>
          </div>
        ) : ''}
        {currentResContent ? (
          <div id="assistant_message" className='assistant_message_content'>
            <div style={{ background: backgroundColor_1, color: textColor }}>
              {currentResContent}
            </div>
          </div>
        ) : ''}
        {loading ? (
          <div className='assistant_message_content'>
            <div style={{ background: backgroundColor_1, color: textColor }}>
              <Loading/>
            </div>
          </div>
        ) : ''}
      </div>
      <div style={{ background: backgroundColor_2 }} className='input_message'>
        <textarea value={content} onChange={onTextAreaChange} className='textarea-class' id="story" name="story" rows="5" cols="33" />
        <div onClick={send} style={{ background: backgroundColor_1 }}  className='send_class'>
          <img src="/app/send.svg"/>
        </div>
      </div>
    </div>
  );
}

export default AIdialogBox;
