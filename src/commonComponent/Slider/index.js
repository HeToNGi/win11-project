import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import css from './style.module.css'


const Slider = ({ className, value = 1, onChange, max = 100, min = 0, style }) => {
  const [trackColor, setTrackColor] = useState('')
  const activeColor = useSelector((state) => state.themes.activeColor);
  const onSliderChange = (e) => {
    onComputerHandler(e.target.value)
    onChange && onChange(e)
  }
  const onComputerHandler = (v) => {
    const start = parseInt(v / (max - min) * 100)
    setTrackColor(`linear-gradient(90deg, ${activeColor} ${parseInt(start - 3)}%, #888888 ${start}%)`)
  }
  useEffect(() => {
    onComputerHandler(value)
  }, [value, activeColor])
  
  return (
    <input
      className={`${className} ${css.slider}`}
      type="range"
      min={min}
      max={max}
      value={value}
      style={{
        background: trackColor,
        ...style
      }}
      onChange={onSliderChange}
    ></input>
  )
}

export default Slider