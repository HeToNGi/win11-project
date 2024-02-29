import { Map, APILoader } from '@uiw/react-baidu-map';
import { useEffect, useState } from 'react';

const MapContent = function() {
  const [center, setCenter] = useState({lng: 121.424333, lat: 31.228604});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCenter({
            lng: longitude,
            lat: latitude,
          });
        },
        function(error) {
          console.log("无法获取当前位置：" + error.message);
        }
      );
    } else {
      console.log("浏览器不支持地理位置功能");
    }
  }, [])
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <APILoader akay="eYpCTECSntZmw0WyoQ7zFpCRR9cpgHFG">
        <Map zoom={13} style={{ width: '100%', height: '100%', overflow: 'auto' }} center={center} enableScrollWheelZoom={false} />
      </APILoader>
    </div>
  )
}
export default MapContent
