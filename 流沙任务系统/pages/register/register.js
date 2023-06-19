Page({
  handleRegister(e) {
    const { username, password } = e.detail.value;

    // 调用API接口，提交注册信息
    wx.request({
      url: 'https://www.wangyan.net/api/Identityinfo',
      method: 'POST',
      data: {
        username,
        password,
      },
      success: (res) => {
        // 处理注册成功的情况，例如跳转到登录页面或首页
        wx.navigateTo({ url: '/pages/home/home' });
      },
      fail: (error) => {
        // 处理错误情况，例如显示提示信息
        console.error('注册失败：', error);
      },
    });
  },
});