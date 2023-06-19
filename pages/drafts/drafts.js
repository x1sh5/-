// pages/shenhe/shenhe.js
Page({

  button3Click() {
    wx.navigateTo({
      url: '/pages/shenhe/shenhe',
    });
  },

  navToSearchPage() {
    wx.navigateTo({
      url: '/pages/goods/search/index'
    });
  },
data: {
  draftData: {}
},


/**
 * 生命周期函数--监听页面加载
 */
onLoad: function () {
  wx.getStorage({
    key: 'draftData',
    success: (res) => {
      if (res.data && res.data.length > 0) {
        this.setData({
          draftDataStorage: res.data,
        });
      } else {
        console.log('草稿数据为空');
        this.setData({
          draftDataStorage: [], // 设置为空数组，避免 undefined
        });
      }
    },
    fail: (err) => {
      console.log('获取草稿数据失败:', err);
      this.setData({
        draftDataStorage: [], // 设置为空数组，避免 undefined
      });
    },
  });
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage() {

}
})
// 假设您有一个名为 draft 的对象，包含了标题和描述
const draft = {
  title: '草稿标题',
  description: '草稿描述',
};

// 使用 wx.setStorage 方法将草稿数据保存到本地缓存
wx.setStorage({
  key: 'draftData',
  data: [draft],
  success: () => {
    console.log('草稿数据保存成功');
  },
  fail: (err) => {
    console.log('草稿数据保存失败:', err);
  },
});