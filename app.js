import updateManager from './common/updateManager';

App({
  onLaunch: function () {},
  globalData: {
    username: "",
    email: "",
    apiBaseUrl: "https://www.wangyan.net/api" // 替换为您的实际 API 地址
  },
  onShow: function () {
    updateManager();
    
  },
  
});
