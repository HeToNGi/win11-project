import { useEffect } from 'react';
import anime from 'animejs';
import '../../style/Camera.css'
let t = null;
let mediaStream = null;
function Camera() {
  useEffect(() => {
    if (!t) {      
      t = setTimeout(() => {
        const video = document.getElementById('video');
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function (stream) {
            video.srcObject = stream;
            mediaStream = stream;
            //播放视频
            video.play();
          })
          .catch(function (error) {
            console.log('Error accessing the camera:', error);
          });
      }, 200)
    }
    return () => {
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach(track => track.stop());
        t = null;
        mediaStream = null;
      }
    }
  }, [])
  const kacha = () => {
      anime({
        targets: '.camera_btn_inner',
        scale: 0.8,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        duration: 200,
      }).play();
  };
  return (
    <div className='camera_content'>
      <video id="video" className="video_class"></video>
      <div className='camera_btn_outer'>
        <div onClick={kacha} className='camera_btn_inner'></div>
      </div>
    </div>
  );
}

export default Camera;
