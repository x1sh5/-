import updateManager from './common/updateManager';

App({
  onLaunch: function () {},
  globalData: {
    taskData: {},
    username: "",
    email: "",
    apiBaseUrl: "https://localhost:7221/api" // 替换为您的实际 API 地址
  },
  onShow: function () {
    updateManager();

  },
  
});
