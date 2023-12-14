import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, Avatar, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { get, post } from '../../../util/axios.js'
import { formatDate } from '../../../util'
import defaultAvter from '../../../assets/defaultAvter.svg';
import callout from '../../../assets/callout.svg';
import callin from '../../../assets/callin.svg';
import anime from 'animejs';
const renderContacts = (list, onListItemClick) => {
  const onContactsClick = (item) => {
    onListItemClick(item.telephone_number)
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item onClick={() => {onContactsClick(item)}} className='item hoverBackground_2'>
          <List.Item.Meta
            avatar={<Avatar src={item.avatar_img} />}
            title={item.remarks}
            description={item.telephone_number}
          />
        </List.Item>
      )}
    />
  )
}

const renderCallRecord = (list, onListItemClick) => {
  const onContactsClick = (item) => {
    onListItemClick(item.telephone_number)
  }
  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item onClick={() => {onContactsClick(item)}} className='item hoverBackground_2'>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar_img} />}
              title={item.remarks}
              description={item.start_time}
            />
          </List.Item>
        )}
      />
    </Fragment>
  )
}
const CallContacts = ({ onListItemClick, calling }) => {
  const dispatch = useDispatch();
  const backgroundColor_1 = useSelector((state) => state.themes.backgroundColor_1);
  const backgroundColor_2 = useSelector((state) => state.themes.backgroundColor_2);
  const userInfo = useSelector((state) => state.user_info);
  const [callRecord, setCallRecord] = useState([]);
  const [currentList, setCurrentList] = useState('callRecord');
  const [addInfo_telephone_number, setAddInfo_telephone_number] = useState('');
  const [addInfo_user_name, setAddInfo_user_name] = useState('');
  const [addInfo_remarks, setAddInfo_remarks] = useState('');
  const [addInfo_avatar_img, setAddInfo_avatar_img] = useState('');
  
  const getContacts = () => {
    get('/contacts', {user_name: userInfo.user_name}).then(res => {
      if (res.code === 0) {
        // setContacts(res.data);
        dispatch({type: 'CHANGE_USER_INFO', value: {
          contacts: res.data.map(d => {
            if (!d.avatar_img) d.avatar_img = defaultAvter;
            return d;
          })
        }});
      }
    })
  }
  const getCallRecord = () => {
    get('/call_record', {telephone_number: userInfo.telephone_number}).then(res => {
      if (res.code === 0 && res.data) {
        const list = res.data.map(d => {
          const isCaller = userInfo.telephone_number === d.caller;
          d.isCaller = isCaller;
          const tele = isCaller ? d.receiver : d.caller;
          const contact = userInfo.contacts.find(i => i.telephone_number === tele);
          d.remarks = contact ? contact.remarks : tele;
          d.avatar_img = isCaller ? callout : callin;
          d.start_time = formatDate(d.start_time);
          d.telephone_number = isCaller ? d.receiver : d.caller;
          return d;
        })
        setCallRecord(list || [])
      }
    })
  }

  useEffect(() => {
    getContacts();
    if (!calling) {
      getCallRecord();
    }
  }, [calling]);
  const onCheckContet = (key) => {
    anime({
      targets: '.silder_class',
      left: key === 'contacts' ? '80px' : '5px',
      right: key === 'contacts' ? '5px' : '80px',
      easing: 'easeInOutExpo',
      duration: 200,
    }).play();
    setCurrentList(key);
  }
  const onOpenContact = () => {
    setAddInfo_telephone_number('');
    setAddInfo_user_name('');
    setAddInfo_remarks('');
    anime({
      targets: '.addc_panal',
      height: '200px',
      padding:'20px',
      easing: 'easeInOutExpo',
      duration: 200,
    });
  }
  const onCloseContact = () => {
    anime({
      targets: '.addc_panal',
      height: '0',
      padding: '0',
      easing: 'easeInOutExpo',
      duration: 200,
    })
  }

  const onAddContact = () => {
    const data = {
      user_name: userInfo.user_name,
      remarks: addInfo_remarks,
      telephone_number: addInfo_telephone_number,
      contact_name: addInfo_user_name,
      avatar_img: addInfo_avatar_img
    }
    post('/add_contact', data).then(res => {
      getContacts();
      onCloseContact();
    })
  }
  let add_t = null;
  const onAddInfo = (value, key) => {
    if (key === 'user_name') {
      setAddInfo_user_name(value);
    }
    if (key === 'telephone_number') {
      setAddInfo_telephone_number(value);
    }
    if (key === 'remarks') {
      setAddInfo_remarks(value);
    }
    if (add_t) {
      clearTimeout(add_t);
      add_t = null;
    }
    value = value.replace(/'/g, '');
    if (!value) return;
    add_t = setTimeout(() => {
      if (key === 'telephone_number' || key === 'user_name') {
        const param = {};
        param[key] = value;
        get('/userinfo_of_teleorname', param).then(res => {
          if (res.code === 1) {return;}
          setAddInfo_user_name(res.data.win11_user_name);
          setAddInfo_telephone_number(res.data.win11_telephone_number);
          setAddInfo_avatar_img(res.data.win11_avatar_img);
        })
      }
    }, 200)
  }
  return (
    <div className='contacts_content' style={{ background: backgroundColor_2 }} >
      <div className='addc_panal' style={{ background: backgroundColor_1 }} >
        <div className='addpanel_item'>
          <div>电话号码</div>
          <input value={addInfo_telephone_number} onChange={(e) => {onAddInfo(e.target.value, 'telephone_number')}}/>
        </div>
        <div className='addpanel_item'>
          <div>用户名</div>
          <input value={addInfo_user_name} onChange={(e) => {onAddInfo(e.target.value, 'user_name')}}/>
        </div>
        <div className='addpanel_item'>
          <div>备注</div>
          <input value={addInfo_remarks} onChange={(e) => {onAddInfo(e.target.value, 'remarks')}}/>
        </div>
        <Button style={{ width: '100%', marginBottom: '10px'}} onClick={onAddContact} icon={<PlusCircleOutlined />}>添加</Button>
        <Button style={{ width: '100%'}} onClick={onCloseContact} icon={<PlusCircleOutlined />}>取消</Button>
      </div>
      <div className='top_silder' style={{ background: backgroundColor_1 }}>
        <div className='select_item' onClick={() => {onCheckContet('callRecord')}}>通话记录</div>
        <div className='select_item' onClick={() => {onCheckContet('contacts')}}>联系人</div>
        <div className='silder_class' style={{ background: backgroundColor_2 }}></div>
        <Button onClick={onOpenContact} type="icon" shape="circle" style={{position: 'absolute', top: '8px',left: '130%'}} icon={<PlusCircleOutlined />} size="small" />
      </div>
      <div className='list_content hiddeScroll'>
        {currentList === 'contacts' ? renderContacts(userInfo.contacts, onListItemClick) : renderCallRecord(callRecord, onListItemClick)}
      </div>
    </div>
  );
};

export default CallContacts;
