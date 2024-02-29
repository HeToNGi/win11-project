import React, {useEffect} from "react";
import '../../style/Whiteborad.css'
const  WhitePlan = function() {
  useEffect(() => {
    // console.log(fabric, document.getElementById('canvas'))
    const canv = new fabric.Canvas('canvas');
    // 开启画板模式
    canv.isDrawingMode = true;
    
    // 设置画笔颜色和宽度
    canv.freeDrawingBrush.color = 'black';
    canv.freeDrawingBrush.width = 5;
    setTimeout(() => {
      const whiteplan_content = document.getElementById('whiteplan_content');
      console.log(whiteplan_content.clientHeight)
      console.log(whiteplan_content.clientWidth)
    }, 100)
  }, [])

  return (
    <div id="whiteplan_content" className="whiteplan_content">
      <canvas width="1920" height="849" className="canvas_calss" id="canvas" />
    </div>
  )
}
export default WhitePlan;
