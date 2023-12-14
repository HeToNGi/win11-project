import { useEffect, useState } from 'react';
// import anime from 'animejs';
import '../../../style/FaceTime.css'
import { useSelector, useDispatch } from 'react-redux';
import CallContacts from './CallContacts';
import { get, post } from '../../../util/axios.js'
import defaultAvter from '../../../assets/defaultAvter.svg';
import { Button } from 'antd';
import jujue from '../../../assets/jujue.svg';
let t = null;
let mediaStream_statc = null;
let t_rec = null;
let peerSend = null;
let peerReceive = null;
let startTime = 0; // 通话开始时间
let endTime = 0; // 通话结束时间
let connected = 0; // 是否接通
let receiver = ''; // 接收对象
// let offer = null;
// let answer = null;
// receive
function FaceTime({ parameter }) {
  const dispatch = useDispatch();
  const { target, isPassiveOpening } = parameter
  // const [targetUserName, setTargetUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.user_info);
  const [mediaStream, setMediaStream] = useState(null);
  const [calling, setCalling] = useState(false);
  const [targetUserInfo, setTargetUserInfo] = useState({});
  
  // 发送初始化
  const peerSendInit = (stream, tar) => {
    // 1. 创建连接实例
    peerSend = new RTCPeerConnection()
    // 2. 添加视频流轨道
    stream.getTracks().forEach(track => {
      peerSend.addTrack(track, stream)
    })
    // 添加 candidate
    peerSend.onicecandidate = event => {
      if (event.candidate) {
        window.socket_rs.send(JSON.stringify({target: tar, data: {type: 'candidate', data: event.candidate}}))
      }
    }
    // 检测连接状态
    peerSend.onconnectionstatechange = event => {
      if (peerSend && peerSend.connectionState === 'connected') {
        console.log('发送流连接成功！')
        setLoading(false);
      }
      if (peerSend && peerSend.connectionState === 'disconnected') {
        peerSend && peerSend.close()
        peerSend = null;
        console.log('连接断开')
      }
    }

    // 互换sdp认证
    transSDP(tar)
  }
  const transSDP = async (target) => {
    const offer = await peerSend.createOffer()
    window.socket_rs.send(JSON.stringify({target: target, data: {type: 'offer', data: offer}}))
    window.socket_rs.addEventListener('message', async (event) => {
      const { type, data } = JSON.parse(event.data);
      if (type === 'answer' && peerSend) {
        try {
          // 3. 发送端设置 SDP
          await peerSend.setLocalDescription(offer)
          await peerSend.setRemoteDescription(data)          
        } catch (error) {
          console.log(error)
        }

      }
    });
  }
  // 接收初始化
  const peerReceiveInit = async () => {
    const video_facetime_target = document.getElementById('video_facetime_target');
    peerReceive = new RTCPeerConnection()
    peerReceive.ontrack = async event => {
      try {
        if (!video_facetime_target) return;
        const [remoteStream] = event.streams
        video_facetime_target.srcObject = remoteStream;
        video_facetime_target.play();
      } catch (error) {
        console.log(error);
      }
    }
    peerReceive.onconnectionstatechange = event => {
      if (peerReceive && peerReceive.connectionState === 'disconnected') {
        setLoading(false);
        setCalling(false);
        peerSend && peerSend.close();
        peerReceive && peerReceive.close();
        peerReceive = null;
        peerSend = null;
        if (!isPassiveOpening) {
          endTime = (new Date()).getTime();
          connected = 1;
          addCallRecord();
        }
        dispatch({
          type: 'CHANGE_WINDOW',
          value: {
            appName: 'facetime',
            parameter: undefined
          }
        })
        console.log('peerReceive, 连接断开')
      }
    }
    window.socket_rs.addEventListener('message', async (event) => {
      try {
        const { type, data } = JSON.parse(event.data);
        if (type === 'offer' && peerReceive) {
          await peerReceive.setRemoteDescription(data);
          // 2. 创建 answer
          const answer = await peerReceive.createAnswer();
          await peerReceive.setLocalDescription(answer);
          window.socket_rs.send(JSON.stringify({target: target, data: {type: 'answer', data: answer}}))
        }
        if (type === 'candidate') {
          peerReceive.addIceCandidate(data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  useEffect(() => {
    if (!mediaStream || !target) return;
    setCalling(true);
    clearTimeout(t_rec);
    t_rec = null;
    if (isPassiveOpening) {
      peerReceiveInit();
      window.socket_rs.send(JSON.stringify({target: target, data: {type: 'accept', source: userInfo.telephone_number}}))
      window.socket_rs.addEventListener('message', async (event) => {
        const { type, data } = JSON.parse(event.data);
        if (type === 'callback') {
          peerSendInit(mediaStream, target);
        }
      });
    } else {
      startTime = (new Date()).getTime();
      peerSendInit(mediaStream, target);
      peerReceiveInit();
      window.socket_rs.send(JSON.stringify({target: target, data: {type: 'callback', source: userInfo.telephone_number}}))
    }
    return async () => {
      peerSend && peerSend.close();
      peerSend = null;
      peerReceive && peerReceive.close();
      peerReceive = null;
    }
  }, [isPassiveOpening, mediaStream, target])

  useEffect(() => {
    window.socket_rs.addEventListener('message', (e) => {
      const { type, source } = JSON.parse(e.data);
      if (type === 'refuse' || type === 'accept') {
        setLoading(false);
        clearTimeout(t_rec);
        t_rec = null;
        if (type === 'refuse') {
          startTime = (new Date()).getTime();
          addCallRecord()
        }
      }
    });
    if (!t) {
      t = setTimeout(async () => {
        try {
          const video_facetime_self = document.getElementById('video_facetime_self');
          if (!video_facetime_self) return;
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video_facetime_self.srcObject = stream;
          mediaStream_statc = stream;
          setMediaStream(stream);
          //播放视频
          video_facetime_self.play();
          clearTimeout(t);
          t = null;
        } catch (error) {
          console.log(error)
        }
      }, 200)
    }
    return () => {
      close()
    }
  }, [])
  const close = () => {
    if (mediaStream_statc) {
      const tracks = mediaStream_statc.getTracks();
      tracks.forEach(track => track.stop());
    }
    clearTimeout(t);
    t = null;
    mediaStream_statc = null;
    setMediaStream(null);
    peerSend = null;
    peerReceive = null;
    setCalling(false);
    clearTimeout(t_rec);
    t_rec = null;
  }

  const onListItemClick = (telephone_number) => {
    makingPhoneCalls(telephone_number)
  }

  const makingPhoneCalls = (telephone_number) => {
    setLoading(true);
    get('/avatar_of_telephone_number', {
      telephone_number,
    }).then(res => {
      if (res.code === 0) {
        setTargetUserInfo(res.data)
        receiver = telephone_number;
        window.socket_rs.send(JSON.stringify({target: telephone_number, data: {type: 'invite', source: userInfo.telephone_number }}))
        t_rec = setTimeout(() => {
          interrupt();
          clearTimeout(t_rec);
          t_rec = null;
        }, 10000)
      }
    })
  }

  // 中断拨打
  const interrupt = () => {
    window.socket_rs.send(JSON.stringify({target: targetUserInfo.win11_telephone_number, data: {type: 'interrupt', source: {} }}))
    setLoading(false);
    startTime = (new Date()).getTime();
    addCallRecord()
  }

  const endCall = () => {
    peerSend && peerSend.close();
    peerSend = null;
    setCalling(false);
    setLoading(false);
  }

  const addCallRecord = (key) => {
    if (receiver) {
      post('/add_callrecord', { 
        caller: userInfo.telephone_number,
        receiver,
        start_time: startTime + '',
        duration: connected === 0 ? 0 : endTime - startTime,
        connected,
      }).then(res => {
        console.log(res);
      })
    }
    startTime = 0;
    endTime = 0;
    connected = 0;
    receiver = '';
  }

  return (
    <div className='facetime_content'>
      <div className='video_content'>
        {calling ? (
          <div className='endcall_class'>
            <Button shape="circle" type="text" size="large" >
              <img className='notification_btn' src={jujue} onClick={() => {endCall()}} />
            </Button>
          </div>
        ) : <CallContacts calling={calling} onListItemClick={onListItemClick} />}
        {loading ? (
          <div className="loading_call">
            <img src={targetUserInfo.avatar_img || defaultAvter} />
            <span className='calling_name'>{targetUserInfo.win11_user_name || '未知用户'}</span>
            <span>正在拨打电话</span>
            <Button shape="circle" type="text" size="large" >
              <img className='notification_btn' src={jujue} onClick={() => {interrupt()}} />
            </Button>
          </div>
          ) : '' }
        <video id="video_facetime_target"></video>
        <video id="video_facetime_self"></video>
      </div>
    </div>
  );
}

export default FaceTime;
