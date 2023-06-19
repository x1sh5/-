
App({
  onLaunch: function () {
    // ...
  },
  globalData: {
    username: "",
    email: ""
  }
});
Page({
  data: {
    formData: {
      username: "",
      email: ""
    }
  },

  async handleSubmit() {
    const { username, email } = this.data.formData;
    if (username && email) {
      try {
        const app = getApp();
        const res = await wx.request({
          url: `${app.globalData.apiBaseUrl}https://www.wangyan.net/api/Assignment`, // 替换为您的实际 API 地址
          method: "POST",
          data: {
            username: username,
            email: email
          }
        });
  
        wx.navigateTo({
          url: "/pages/display/display"
        });
      } catch (error) {
        console.error("Error saving data to the API:", error);
      }
    } else {
      wx.showToast({
        title: "请填写完整信息",
        icon: "none"
      });
    }
  },

  handleInputChange(e) {
    const { name } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`formData.${name}`]: value
    });
  }
});