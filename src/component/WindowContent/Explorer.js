import { useEffect, useState } from 'react';
import anime from 'animejs';
import { useSelector } from 'react-redux';
import { Tree, Divider } from 'antd';
import '../../style/Explorer.css';

function Explorer() {
  return (
    <div className='explorer_content'>
      <div className='msribbon_class ex_flex'>
        Text
        <Divider type="vertical" />
        <a href="#">Link</a>
        <Divider type="vertical" />
        <a href="#">Link</a>
      </div>
      <div className='urps_class ex_flex'>
        君不见高堂明镜悲白发
      </div>
      <div className='exp_content'>
        <div className='file_tree_class'>
        </div>
        <div className='file_list_class'></div>
      </div>
      <div className='exp_footer'></div>
    </div>
  );
}

export default Explorer;
