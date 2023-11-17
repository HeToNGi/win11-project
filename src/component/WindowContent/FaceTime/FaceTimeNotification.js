import { Fragment, useEffect } from 'react';
import { notification, Button, message } from 'antd';
import jieting from '../../../assets/jieting.svg';
import jujue from '../../../assets/jujue.svg';
import { useSelector, useDispatch } from 'react-redux';

function FaceTimeNotification() {
  const [api, contextHolder] = notification.useNotification();
  const [messageApi, contextHolderMessage] = message.useMessage();
  const showLogin = useSelector((state) => state.showLogin);
  const userInfo = useSelector((state) => state.user_info);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!showLogin && window.socket_rs) {
      window.socket_rs.addEventListener('message', (e) => {
        const { type, source } = JSON.parse(e.data);
        if (type === 'invite') {
          openNotification(source);
        }
        if (type === 'refuse') {
          messageApi.open({
            type: 'error',
            content: source + ' 拒绝了你的邀请！',
          });
        }
        if (type === 'accept') {
          console.log('accept', '甚至接受了');
          dispatch({
            type: 'CHANGE_WINDOW',
            value: {
              appName: 'facetime',
              parameter: {
                target: source,
                isPassiveOpening: false,
              }
            }
          })
        }
        if (type === 'interrupt') {
          api.destroy();
        }
      })
    }
  }, [showLogin]);
  
  // 拒绝接听
  const onRefuse = (source) => {
    api.destroy();
    window.socket_rs.send(JSON.stringify({target: source, data: {type: 'refuse', source: userInfo.telephone_number}}))
  }
  // 接收接听
  const onAccept = (source) => {
    api.destroy();
    dispatch({
      type: 'OPEN_WINDOW_APP',
      value: {
        appName: 'facetime',
        width: '700px',
        height: '500px',
        top: '50px',
        left: '50px',
        parameter: {
          target: source,
          isPassiveOpening: true,
        }
      },
    });
  }
  const openNotification = (source) => {
    const contact = userInfo.contacts.find(i => i.telephone_number === source);
    const remarks = contact ? contact.remarks : source;
    const key = `open${Date.now()}`;
    const btn = (
      <div>
        <Button type="text" size="large" >
          <img className='notification_btn' src={jujue} onClick={() => {onRefuse(source)}} />
        </Button>
        <Button type="text" size="large">
          <img className='notification_btn' src={jieting} onClick={() => {onAccept(source)}}/>
        </Button>
      </div>
    );
    api.open({
      message: '【' + remarks + '】邀请通话',
      description: '',
      btn,
      key,
      duration: 0,
      onClose: () => {onRefuse(source)},
    });
  };
  return (
    <Fragment>
      {contextHolder}
      {contextHolderMessage}
    </Fragment>
  );
}

export default FaceTimeNotification;
