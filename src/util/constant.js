export const modalMap = {
  widget: {
    type: 'CHANGE_WIDGET_SHOW',
    valueKey: 'widget_show',
  },
  menu: {
    type: 'CHANGE_MENU_SHOW',
    valueKey: 'menu_show',
  },
  search: {
    type: 'CHANGE_SEARCH_SHOW',
    valueKey: 'search_show',
  },
  bandtogg: {
    type: 'CHANGE_BANDTOGG_SHOW',
    valueKey: 'bandtogg_show',
  },
  panetogg: {
    type: 'CHANGE_PANETOGG_SHOW',
    valueKey: 'panetogg_show',
  },
  calntogg: {
    type: 'CHANGE_CALNTOGG_SHOW',
    valueKey: 'calntogg_show',
  },
  aiDialogBox: {
    type: 'CHANGE_AIDIALOGBOX_SHOW',
    valueKey: 'aiDialogBox_show',
    noBlur: true,
  }
}
export const layoutMap = [{
    name: 'row_2_equal',
    childer: [{
      name: 'row_2_equal_left',
      top: '0px',
      left: '0px',
      width: '44%',
      height: '100%',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    }, {
      name: 'row_2_equal_right',
      top: '0px',
      right: '0px',
      width: '44%',
      height: '100%',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    }]
  }, {
    name: 'row_2_n_equal',
    childer: [{
      name: 'row_2_n_equal_left',
      top: '0px',
      left: '0px',
      width: '60%',
      height: '100%',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    }, {
      name: 'row_2_n_equal_right',
      top: '0px',
      right: '0px',
      width: '28%',
      height: '100%',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    }]
  }, {
    name: 'row_3_equal',
    childer: [{
      name: 'row_3_equal_left',
      top: '0px',
      left: '0px',
      width: '30%',
      height: '100%',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    }, {
      name: 'row_3_equal_center',
      top: '0px',
      right: '0px',
      left: '0',
      margin: '0 auto',
      width: '30%',
      height: '100%',
    }, {
      name: 'row_3_equal_right',
      top: '0px',
      right: '0px',
      width: '30%',
      height: '100%',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    }]
  },{
    name: 'row_2_col_1_2_n_equal',
    childer: [{
      name: 'row_2_col_1_2_n_equal_left',
      top: '0px',
      left: '0px',
      width: '44%',
      height: '100%',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    }, {
      name: 'row_2_col_1_2_n_equal_right_top',
      top: '0px',
      right: '0px',
      width: '44%',
      height: '44%',
      borderTopRightRadius: '10px',
    }, {
      name: 'row_2_col_1_2_n_equal_right_bottom',
      bottom: '0px',
      right: '0px',
      width: '44%',
      height: '44%',
      borderBottomRightRadius: '10px',
    }]
  }, {
    name: 'row_2_col_2_2_equal',
    childer: [{
      name: 'row_2_col_2_2_equal_left_top',
      top: '0px',
      left: '0px',
      width: '44%',
      height: '44%',
      borderTopLeftRadius: '10px',
    }, {
      name: 'row_2_col_2_2_equal_left_bottom',
      bottom: '0px',
      left: '0px',
      width: '44%',
      height: '44%',
      borderBottomLeftRadius: '10px',
    }, {
      name: 'row_2_col_2_2_equal_right_bottom',
      bottom: '0px',
      right: '0px',
      width: '44%',
      height: '44%',
      borderBottomRightRadius: '10px',
    }, {
      name: 'row_2_col_2_2_equal_right_top',
      top: '0px',
      right: '0px',
      width: '44%',
      height: '44%',
      borderTopRightRadius: '10px',
    }]
  }, {
    name: 'row_3_n_equal',
    childer: [{
      name: 'row_3_n_equal_left',
      top: '0px',
      left: '0px',
      width: '25%',
      height: '100%',
      borderTopLeftRadius: '10px',
      borderBottomLeftRadius: '10px',
    }, {
      name: 'row_3_n_equal_center',
      top: '0px',
      right: '0px',
      left: '0',
      margin: '0 auto',
      width: '40%',
      height: '100%',
    }, {
      name: 'row_3_n_equal_right',
      top: '0px',
      right: '0px',
      width: '25%',
      height: '100%',
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    }]
  }]
export const layoutproMap = {
    row_2_equal_right: {
      width: 0.5,
      height: 0.95,
      top: 0,
      left: 0.5,
    },
    row_2_equal_left: {
      width: 0.5,
      height: 0.95,
      top: 0,
      left: 0,
    },
    row_2_n_equal_left: {
      width: 0.7,
      height: 0.95,
      top: 0,
      left: 0,
    },
    row_2_n_equal_right: {
      width: 0.3,
      height: 0.95,
      top: 0,
      left: 0.7,
    },
    row_3_equal_left: {
      width: 0.3333,
      height: 0.95,
      top: 0,
      left: 0,
    },
    row_3_equal_center: {
      width: 0.3333,
      height: 0.95,
      top: 0,
      left: 0.3333,
    },
    row_3_equal_right: {
      width: 0.3334,
      height: 0.95,
      top: 0,
      left: 0.6666,
    },
    row_2_col_1_2_n_equal_left: {
      width: 0.5,
      height: 0.95,
      top: 0,
      left: 0,
    },
    row_2_col_1_2_n_equal_right_top: {
      width: 0.5,
      height: 0.95 * 0.5,
      top: 0,
      left: 0.5,
    },
    row_2_col_1_2_n_equal_right_bottom: {
      width: 0.5,
      height: 0.95 * 0.5,
      top: 0.95 * 0.5,
      left: 0.5,
    },
    row_2_col_2_2_equal_left_top: {
      width: 0.5,
      height: 0.95 * 0.5,
      top: 0,
      left: 0,
    },
    row_2_col_2_2_equal_left_bottom: {
      width: 0.5,
      height: 0.95 * 0.5,
      top: 0.95 * 0.5,
      left: 0,
    },
    row_2_col_2_2_equal_right_bottom: {
      width: 0.5,
      height: 0.95 * 0.5,
      top: 0.95 * 0.5,
      left: 0.5,
    },
    row_2_col_2_2_equal_right_top: {
      width: 0.5,
      height: 0.95 * 0.5,
      top: 0,
      left: 0.5,
    },
    row_3_n_equal_left: {
      width: 0.25,
      height: 0.95,
      top: 0,
      left: 0,
    },
    row_3_n_equal_center: {
      width: 0.5,
      height: 0.95,
      top: 0,
      left: 0.25,
    },
    row_3_n_equal_right: {
      width: 0.25,
      height: 0.95,
      top: 0,
      left: 0.75,
    },
  }
export const optionList = [{
    key: 'system',
    name: 'System',
  }, {
    key: 'bluetooth',
    name: 'Bluetooth & devices',
  },{
    key: 'network',
    name: 'Network & internet',
  },{
    key: 'personalisation',
    name: 'Personalisation',
  },{
    key: 'apps',
    name: 'Apps',
  },{
    key: 'accounts',
    name: 'Accounts',
  },{
    key: 'time',
    name: 'Time & language',
  },{
    key: 'gaming',
    name: 'Gaming',
  },{
    key: 'accessibility',
    name: 'Accessibility',
  },{
    key: 'privacy',
    name: 'Privacy & security',
  },{
    key: 'update',
    name: 'Windows Update',
  }]
export const themes = [{
  name: 'light_class',
  desktop_background_image: '/像是秋天.jpg'
}, {
  name: 'dark_class',
  desktop_background_image: '/斑马斑马.jpg'
}]
export const APP_PRO = {
  thisPc: {
    icon: '/app/user.png',
    appName: 'thisPc',
    title: 'This Pc',
    taskbar: false,
    desktopShortcut: true,
  },
  settings: {
    appName: 'settings',
    title: 'Settings',
    icon: '/app/settings.png',
    taskbar: true,
    desktopShortcut: false,
  },
  explorer: {
    appName: 'explorer',
    title: 'Explorer',
    icon: '/app/explorer.png',
    taskbar: true,
    desktopShortcut: true,
  },
  google: {
    appName: 'google',
    title: 'Google',
    icon: '/app/google.svg',
    taskbar: true,
    desktopShortcut: true,
  },
  store: {
    appName: 'store',
    title: 'Store',
    icon: '/app/store.png',
    taskbar: true,
    desktopShortcut: true,
  },
  unescape: {
    icon: '/app/unescape.png',
    title: 'Unescape',
    appName: 'unescape',
    taskbar: false,
    desktopShortcut: true,
  },
  recycleBin: {
    icon: '/app/bin0.png',
    appName: 'recycleBin',
    title: 'Recycle Bin',
    taskbar: false,
    desktopShortcut: true,
  },
  het: {
    icon: 'http://152.136.52.163:4000/favicon.ico',
    title: 'HeT.',
    appName: 'het',
    taskbar: false,
    desktopShortcut: true,
    parameter: {
      src: 'http://152.136.52.163:4000'
    }
  },
  camera: {
    icon: '/app/camera.svg',
    title: 'Camera',
    appName: 'camera',
    taskbar: false,
    desktopShortcut: false,
  },
  facetime: {
    icon: '/app/facetime.svg',
    title: 'FaceTime',
    appName: 'facetime',
    taskbar: false,
    desktopShortcut: false,
  },
  mineClearance: {
    icon: '/app/mine_clearance.svg',
    title: 'MINE Clearance',
    appName: 'mineClearance',
    taskbar: false,
    desktopShortcut: false,
  },
  noted: {
    icon: '/app/noted.svg',
    title: 'NotePad',
    appName: 'noted',
    taskbar: false,
    desktopShortcut: false,
  },
  whiteborad: {
    icon: '/app/whiteborad.svg',
    title: 'Whiteborad',
    appName: 'whiteborad',
    taskbar: false,
    desktopShortcut: false,
  },
  map: {
    icon: '/app/map.svg',
    title: 'Map',
    appName: 'map',
    taskbar: false,
    desktopShortcut: false,
  }
}
export const ALL_APPS = [
    {
      icon: '/app/user.png',
      appName: 'thisPc',
      title: 'This Pc',
      isPinned: false,
    },{
      icon: '/app/calculator.svg',
      title: 'Calculator',
      appName: 'calculator',
      isPinned: true,
    }, {
      icon: '/app/taskmanger.svg',
      title: 'Task Manger',
      appName: 'taskmanger',
      isPinned: true,
    }, {
      icon: '/app/github.svg',
      title: 'GitHub',
      appName: 'github',
      isPinned: true,
    }, {
      appName: 'settings',
      title: 'Settings',
      icon: '/app/settings.png',
      isPinned: true,
    }, {
      appName: 'explorer',
      title: 'Explorer',
      icon: '/app/explorer.png',
      isPinned: true,
    }, {
      appName: 'google',
      title: 'Google',
      icon: '/app/google.svg',
      isPinned: true,
    }, {
      appName: 'store',
      title: 'Store',
      icon: '/app/store.png',
      isPinned: true,
    }, {
      icon: '/app/unescape.png',
      title: 'Unescape',
      appName: 'unescape',
      isPinned: true,
    }, {
      icon: '/app/bin0.png',
      appName: 'recycleBin',
      title: 'Recycle Bin',
      isPinned: false,
    }, {
      icon: 'http://152.136.52.163:4000/favicon.ico',
      title: 'HeT.',
      appName: 'het',
      isPinned: true,
      parameter: {
        src: 'http://152.136.52.163:4000'
      }
    }, {
      icon: '/app/email.svg',
      title: 'Email',
      appName: 'email',
      isPinned: true,
    }, {
      icon: '/app/started.svg',
      title: 'Get Started',
      appName: 'started',
      isPinned: true,
    }, {
      icon: '/app/noted.svg',
      title: 'NotePad',
      appName: 'noted',
      isPinned: true,
    }, {
      icon: '/app/whiteborad.svg',
      title: 'Whiteborad',
      appName: 'whiteborad',
      isPinned: true,
    }, {
      icon: '/app/camera.svg',
      title: 'Camera',
      appName: 'camera',
      isPinned: true,
    }, {
      icon: '/app/facetime.svg',
      title: 'FaceTime',
      appName: 'facetime',
      isPinned: true,
    }, {
      icon: '/app/mine_clearance.svg',
      title: 'MINE Clearance',
      appName: 'mineClearance',
      isPinned: true,
    }, {
      icon: '/app/map.svg',
      title: 'Map',
      appName: 'map',
      isPinned: true,
    }]
