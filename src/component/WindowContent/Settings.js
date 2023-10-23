import { useEffect, useState, Fragment, useRef } from 'react';
import '../../style/Settings.css'
// import '../../index.css'
import anime from 'animejs';
import { optionList, themes } from '../../util/constant.js'
import data from '../../util/settingsData.json';
import { useSelector, useDispatch } from 'react-redux';

const UserInfo = () => {
  return (
    <div className='hoverBackground_2 setting_userinfo'>
      <div className='avatar_img' style={{backgroundImage: 'url("https://images.unsplash.com/photo-1695765586912-39758d5de97d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcxfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60")'}}></div>
      <div className='userinfo_name'>
        <span className='name'>
          HeT
        </span>
        <span>
          Local Accenr
        </span>
      </div>
    </div>
  )
}
// 日期弹窗
function Settings({}) {
  // console.log(1, '111')
  // const time = useSelector(s => s.time);
  const [selectIndex, setSelectIndex] = useState(0);
  const [currentSelectData, setCurrentSelectData] = useState([]);
  const themeName = useSelector((state) => state.themes.name);
  const activeColor = useSelector((state) => state.themes.activeColor);
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const desktop_background_image = useSelector((state) => state.themes.desktop_background_image);
  const dispatch = useDispatch();
  const setting_right = useRef(null);
  useEffect(() => {
    anime({
      targets: '.select_active',
      top: selectIndex * 38 + 13 + 'px',
      easing: 'easeInOutExpo',
      duration: 200,
    }).play();
  }, [selectIndex]);

  const onOptionClick = (i) => {
    const t1 = document.getElementById(optionList[selectIndex].name);
    t1.style.position = 'static';
    const t = document.getElementById(optionList[i].name);
    anime({
      targets: '#setting_right_body',
      scrollTop: t.offsetTop - 50,
      easing: 'easeInOutExpo',
      duration: 200,
      complete: ()=> {
        t.style.position = 'sticky';
      }
    }).play();
    setSelectIndex(i);
  }
  useEffect(() => {
    setting_right.current.removeEventListener('wheel', () => {})
    setting_right.current.addEventListener('wheel', () => {
      if (optionList[selectIndex + 1]) {
        const t = document.getElementById(optionList[selectIndex+1].name);
        const t1 = document.getElementById(optionList[selectIndex].name);
        if (t.offsetTop - setting_right.current.scrollTop <= 100) {
          t.style.position = 'sticky';
          t1.style.position = 'static';
          setSelectIndex(selectIndex + 1);
        }
      }
      if (optionList[selectIndex - 1] ) {
        const t = document.getElementById(optionList[selectIndex].name);
        const t1 = document.getElementById(optionList[selectIndex].name);
        if (t.offsetTop - setting_right.current.scrollTop > 100) {
          t.style.position = 'static';
          t1.style.position = 'sticky';
          setSelectIndex(selectIndex - 1);
        }
      }
    })
  }, [selectIndex]);
  useEffect(() => {
    onOptionClick(0);
  }, []);
  const renderTile = (name, ele) => {
    return (
      <div key={name + ele.name} style={{background: backgroundColor_2}} className={ele.type}>
        <span className='setting_icon'>{ele.icon}</span>
        <div>
          <span className='name'>{ele.name}</span>
          <span className='desc'>{ele.desc}</span>
        </div>
        <img src='/settings/right.svg' />
      </div>
    )
  }

  const renderSubHeading = (n, ele) => {
    return (
      <div key={n+ele.name} className={ele.type}>
        {ele.name}
      </div>
    );
  }

  const onChangeThemes = (n) => {
    dispatch({
      type: 'CHANGE_THEMES',
      value: n.name,
    })
  };
  const renderPersonaliseTop = (n, ele) => {
    return (
      <div key={n + ele.type} className='personalise_top'>
        <div className='display_personalise' style={{background: `url(${desktop_background_image})`}}>
          <img src={desktop_background_image} />
        </div>
        <div className='themes_content'>
          <div>Select a theme to apply</div>
          <div className='themes_content_them'>
            {themes.map(t => {
              return (
                <div key={t.name} style={{border: themeName === t.name ? `2px solid ${activeColor}` : 'none'}} onClick={() => {onChangeThemes(t)}}>
                  <img src={t.desktop_background_image} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='setting_content'>
      <div className='setting_left'>
        {UserInfo()}
        <input type="text" style={{background: backgroundColor_2}} className="search" placeholder='Find a setting' name="search" />
        <div className='setting_option hiddeScroll'>
          <div className='select_active' style={{background: activeColor}} />
          {optionList.map((i, index) => {
            return (
              <div onClick={() => {onOptionClick(index)}} className={`option_item hoverBackground_2 ${index === selectIndex && 'option_item_active'}`} key={index}>
                <img src={`/settings/${i.key}.svg`} />
                {i.name}
              </div>
            )
          })}
        </div>
      </div>
      <div className='setting_right'>
        <div id='setting_right_body' ref={setting_right} className='setting_right_body hiddeScroll'>
          {
            optionList.map((o, i) => {
              const d = data[o.name]
              return (
                <Fragment key={i}>
                  <div key={o.name + i} className='setting_right_title' id={o.name} style={{background: backgroundColor_1}}>{o.name}</div>
                  {
                    d.map(ele => {
                      switch (ele.type) {
                        case 'tile': return renderTile(o.name, ele)
                        case "subHeading":
                        case "spacer":
                          return renderSubHeading(o.name, ele);
                        case "personaliseTop":
                          return renderPersonaliseTop(o.name, ele);
                        default: return ''
                      }
                    })
                  }
                </Fragment>
              ) 
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Settings;
