import { useEffect } from 'react';
// import anime from 'animejs';
import '../../style/FaceTime.css'
let t = null;
let mediaStream = null;
function FaceTime() {
  useEffect(() => {
    if (!t) {      
      t = setTimeout(() => {
        const video_facetime_self = document.getElementById('video_facetime_self');
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video_facetime_self.srcObject = stream;
            mediaStream = stream;
            //播放视频
            video_facetime_self.play();
          })
          .catch(function (error) {
            console.log('Error accessing the camera:', error);
          });
      }, 200)
    }
    return () => {
      close()
    }
  }, [])
  const close = () => {
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach(track => track.stop());
      t = null;
      mediaStream = null;
    }
  }
  return (
    <div className='facetime_content'>
    <video id="video_facetime_target"></video>
    <video id="video_facetime_self"></video>
    </div>
  );
}

export default FaceTime;
