import { useEffect, useState, useMemo } from 'react';
import anime from 'animejs';
import { useSelector } from 'react-redux';

import { AddIcon, ClearIcon } from '../../commonComponent/Icon.js'
import '../../style/Google.css';
import { list } from 'postcss';

const BASE_URL = "https://www.google.com/webhp?igu=1"
function Google() {
  // tab列表
  const [tabList, setTabList] = useState([{src: ''}]);
  const [activeKey, setActiveKey] = useState(0)
  useEffect(() => {
    // const tags = document.getElementsByTagName('iframe')
    // const doc = tags[0].contentDocument ||  tags[0].contentWindow.document
    setTabList([{ src: BASE_URL }])
  }, [])
      // https://www.google.com/webhp?igu=1
  // 添加一个tab
  const onAddTagHandler = () => {
    // setActiveKey(list.length)
    setTabList(list => [...list, { src: BASE_URL }])
  }
  const onDeleteTagHandler = (index) => {
    if(tabList.length === 1) {
      return
    } 
    const newList = JSON.parse(JSON.stringify(tabList))
    newList.splice(index, 1)
    setTabList(newList)
  }
  const onActiveTagHandler = (index) => setActiveKey(index)
  
  return (
    <div className='setting_content google_content'>
      <div className='google_tab'> 
        {tabList.map((tab, index) => (
          <div className={`google_tab_item ${activeKey === index}`} key={index}>
            <div className="google_tag_name" onClick={() => onActiveTagHandler(index)}>新标签</div>
            <div className="google_delete" onClick={() => onDeleteTagHandler(index)}>
            </div>
          </div>
        ))}
        <div className='google_add' onClick={onAddTagHandler}>
          <AddIcon />
        </div>
      </div>
      <div className='google_tab_footer'></div>
      <div className='google_search'></div>
      <div className='google_folder'></div>
      <iframe src={tabList[activeKey].src || BASE_URL} frameBorder="0" className='web_iframe'></iframe>
    </div>
  );
}

export default Google;
