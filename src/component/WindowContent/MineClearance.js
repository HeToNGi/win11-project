import { useEffect, useMemo, useState } from 'react';
// import anime from 'animejs';
import '../../style/MineClearance.css';
import { Button } from 'antd';
// import bomb from '../../../public/app/mine_clearance.svg'
import anime from 'animejs';
function MineClearance() {
  // const difficulty = 20;
  // const bombCount = 20;
  const [tacticalDeploymentOfTroops, setTacticalDeploymentOfTroops] = useState([]);
  const temp = [[1, 1], [-1, 1], [1, -1], [0, 1], [1, 0], [0, -1], [-1, 0], [-1, -1]]
  const spread = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const colorMap = ['#a8dd5f', '#a4d36e', '#d95d30', '#7f1beb']
  const [isEnd, setIsEnd] = useState(false);
  const initData = (difficulty) => {
    setIsEnd(false);
    const data = [];
    for (let i = 0; i < difficulty; i++) {
      data[i] = [];
      for (let k = 0; k < difficulty; k++) {
        let isBom = (Math.random() * difficulty < difficulty/5)
        data[i][k] = {
          number: 0,
          isBom: isBom,
          status: 0,
        }
      }
    }
  
    for (let i = 0; i < difficulty; i++) {
      for (let k = 0; k < difficulty; k++) {
        const d = data[i][k];
        if (d.isBom) {
          for (let [dx, dy] of temp) {
            if (data[i+dx] && data[i+dx][k+dy] && !data[i+dx][k+dy].isBom) {
              data[i+dx][k+dy].number +=1;
            }
          }
        }
      }
    }
    setTacticalDeploymentOfTroops(data);
  }

  useEffect(() => {
    initData(20)
  }, []);

  const cleaning = (data, k, i) => {
    if (data[k][i].status === 2 || data[k][i].isBom) return data;
    data[k][i].status = 1;
    for (let [dx, dy] of spread) {
      if (data[k+dx] && data[k+dx][i+dy] && data[k+dx][i+dy].number && data[k+dx][i+dy].status === 0) {
        data[k+dx][i+dy].status = 1;
      } else if (data[k+dx] && data[k+dx][i+dy] && !data[k+dx][i+dy].number && data[k+dx][i+dy].status === 0) {
        data = cleaning(data, k+dx, i+dy);
      }
    }
    return data;
  }
  const onMaskCLick = (k, i) => {
    let data = JSON.parse(JSON.stringify(tacticalDeploymentOfTroops))
    if (data[k][i].isBom) {
      // alert('游戏结束');
      data[k][i].status = 1;
      setIsEnd(true);
    } else {
      data = cleaning(data, k, i);
    }
    setTacticalDeploymentOfTroops(data);
  }
  useEffect(() => {
    anime({
      targets: '.end_class',
      opacity: isEnd ? 1 : 0,
      duration: 700,
    }).play();
  }, [isEnd])
  const onMaskContextMenu = (e, k, i) => {
    e.preventDefault();
    let data = JSON.parse(JSON.stringify(tacticalDeploymentOfTroops));
    data[k][i].status = 2;
    setTacticalDeploymentOfTroops(data);
  }
  const onMaskDoubleClick = (k, i) => {
    let data = JSON.parse(JSON.stringify(tacticalDeploymentOfTroops));
    if (data[k][i].status !== 2) return;
    data[k][i].status = 0;
    setTacticalDeploymentOfTroops(data);
  }
  return (
    <div className='mine_clearance_content'>
      {isEnd ? (
        <div className='end_class'>
          <video autoPlay loop>
            <source src='https://assets.mixkit.co/videos/preview/mixkit-fireworks-iluminate-the-city-night-7405-large.mp4' type="video/mp4" />
          </video>
          <div onClick={() => {initData(20)}} className="start_cl_btn cl_mask">重新开始</div>
        </div>
      ) : ''}
      <div className='tacticalDeploymentOfTroops_content'>
        {tacticalDeploymentOfTroops.length ? tacticalDeploymentOfTroops.map((element, index) => {
          return (
            <div className='row_item' key={index}>
              {element.map((item, i) => {
                return <div className='cl_item' key={i}>
                  <div className='cl_item_content'>
                    {((data) => {
                      if (item.status !== 1) {
                        return <div onDoubleClick={() => {onMaskDoubleClick(index, i)}} onContextMenu={(e) => {onMaskContextMenu(e, index, i)}} onClick={() => {onMaskCLick(index, i)}} className='cl_mask'>
                          {item.status === 2 ? <img src='/app/flag.svg' /> : ''}
                        </div>
                      }
                      if (data.isBom) {
                        return <img src='/app/mine_clearance.svg' />
                      }
                      return <span style={{color: colorMap[data.number] || '#000'}}>{data.number || ''}</span>;
                    })(item)}
                  </div>
                </div>
              })}
            </div>
          )
        }) : ''}
      </div>
    </div>
  );
}

export default MineClearance;
