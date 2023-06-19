Page({
  data: {
    username: "",
    email: ""
  },

  onShow: async function () {
    try {
      const app = getApp();
      const { result: userInfo } = await wx.cloud.callFunction({
        name: "getUserInfo"
      });
      const { OPENID } = userInfo;
  
      const res = await wx.request({
        url: `${app.globalData.apiBaseUrl}https://www.wangyan.net/api/Assignment`, // 替换为您的实际 API 地址
        method: "GET",
        data: {
          openid: OPENID
        }
      });
  
      const { username, email } = res.data;
      this.setData({
        username: username,
        email: email
      });
    } catch (error) {
      console.error("Error getting data from the API:", error);
    }
  }
  
});