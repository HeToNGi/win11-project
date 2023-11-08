import { combineReducers } from 'redux'
import { APP_PRO } from '../util/constant.js'
const dayMap = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  0: '日'
}
const initialState = {
  modal_show_map: {
    widget_show: false,
    menu_show: false,
    search_show: false,
    bandtogg_show: false,
    panetogg_show: false,
    calntogg_show: false,
    aiDialogBox_show: false,
  },
  window_apps: {},
  window_apps_order: [],
  time: {
    year: '', // 年
    month: '', // 月
    day: '', // 星期
    dayString: '',
    date: '', // 日
    hours: '',
    minutes: '',
    seconds: ''
  },
  themes: {
    name: 'light_class',
    backgroundColor_1: '#f3f3f3',
    backgroundColor_2: '#ffffff',
    backgroundColor_3: 'rgba(242, 242, 242, 0.9)',
    textColor: '#000000',
    activeColor: '#0067c0',
    desktop_background_image: '/像是秋天.jpg',
  },
  desktop_applications: APP_PRO,
  tool: {
    'WiFi': false,
    'Bluetooth': false,
    'FlightMode': false,
    'BatterySaver': false,
    'Theme': false,
    'NightLight': false,
  }
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_WIDGET_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, widget_show: action.value}}
    case 'CHANGE_MENU_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, menu_show: action.value}}
    case 'CHANGE_SEARCH_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, search_show: action.value}}
    case 'CHANGE_BANDTOGG_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, bandtogg_show: action.value}}
    case 'CHANGE_PANETOGG_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, panetogg_show: action.value}}
    case 'CHANGE_CALNTOGG_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, calntogg_show: action.value}}
    case 'CHANGE_AIDIALOGBOX_SHOW':
      return {...state, modal_show_map: {...state.modal_show_map, aiDialogBox_show: action.value}}
    case 'OPEN_WINDOW_APP':
      const appKey = action.value.appName;
      if (!appKey) return state;
      for (let k in state.window_apps) {
        state.window_apps[k].zIndex = 10;
      }
      let apps = state.window_apps;
      let baseSize = {
        status: 1, // 0缩小 1打开
        width: '300px',
        height: '200px',
        top: '200px',
        left: '200px',
        isMax: false,
        zIndex: 20,
      }
      if (APP_PRO[appKey]) {
        apps[appKey] = {...APP_PRO[appKey], ...baseSize, ...action.value}
      } else {
        apps[appKey] = {...baseSize, ...action.value}
      }
      state.window_apps_order.push(action.value.appName);
      return {...state, window_apps: {...apps}};
    case 'CHANGE_WINDOW':
      const appName = action.value.appName;
      if (action.value.zIndex) {
        for (let k in state.window_apps) {
          state.window_apps[k].zIndex = 10;
        }
      }
      state.window_apps_order.splice(state.window_apps_order.findIndex(i => i === appName), 1);
      if (action.value.status === 0) {
        state.window_apps_order.unshift(appName);
      } else {
        state.window_apps_order.push(appName);
      }
      const aChange = {...state.window_apps}
      if ((action.value.zIndex === 10 || !action.value.zIndex) && aChange[state.window_apps_order[state.window_apps_order.length - 1]]) {
        aChange[state.window_apps_order[state.window_apps_order.length - 1]].zIndex = 20;
      }
      aChange[action.value.appName] = {...aChange[action.value.appName], ...action.value};
      return {...state, window_apps: aChange};
    case 'CLOSE_WINDOW':
      const aClose = {...state.window_apps}
      state.window_apps_order.splice(state.window_apps_order.findIndex(i => i === action.appName), 1);
      const topAppName = state.window_apps_order[state.window_apps_order.length - 1]
      delete aClose[action.value]
      if (topAppName && aClose[topAppName]) {
        aClose[topAppName].zIndex = 20
      }
      return {...state, window_apps: aClose};
    case 'UPDATE':
      let t = new Date();
      state.time = {
        year: t.getFullYear(), // 年
        month: t.getMonth() + 1, // 月
        day: t.getDay(), // 星期
        date: t.getDate(), // 日
        hours: t.getHours(), // 小时
        minutes: t.getMinutes(), // 分钟
        seconds: t.getSeconds(), // 秒
        dayString: '星期' + dayMap[t.getDay()]
      }
      return {...state}
      break;
    case 'CHANGE_THEMES_PRO':
      state.themes = {...state.themes, ...action.value}
      return {...state}
    case 'CHANGE_THEMES':
      state.themes = {
        name: action.value === 'light_class' ? 'light_class' : "drak_class",
        backgroundColor_1: action.value === 'light_class' ? '#f3f3f3' : '#202020',
        backgroundColor_2: action.value === 'light_class' ? '#ffffff' : 'rgba(255,255,255,.05)',
        backgroundColor_3: 'rgba(242, 242, 242, 0.9)',
        textColor: action.value === 'light_class' ? '#000000' : 'rgba(255, 255, 255, 0.7)',
        activeColor: action.value === 'light_class' ? '#0067c0' : '#4cc2ff',
        desktop_background_image: action.value === 'light_class' ? '/像是秋天.jpg' : '/斑马斑马.jpg',
      }
      return {...state}
    case 'CHANGE_SRC':
      state.google.src = action.value;
      return {...state}
    
    case 'CHANGE_TOOL': 
      const newTool = {...state.tool}
      newTool[action.value] = !newTool[action.value]
    return {...state, tool: newTool}
    default:
      return state
  }
}



export default reducer;
