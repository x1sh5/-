// pages/shenhe/shenhe.js
Page({
  onTextareaInput(e) {
    const { value } = e.detail;
    const lineCount = value.split('\n').length; // 计算输入的文本行数
    const lineHeight = 40; // 每行的高度，根据实际情况调整
    const minHeight = 275; // 输入框的最小高度，根据实际情况调整
    const maxHeight = 1000; // 输入框的最大高度，根据实际情况调整
    
    const height = Math.max(lineCount * lineHeight, minHeight); // 计算实际高度，不小于最小高度
    const scrollHeight = Math.min(height, maxHeight); // 限制高度不超过最大高度
    
    this.setData({
      scrollHeight,
    });
  },

    button1Click() {
      wx.navigateTo({
        url: '/pages/new shenhe/new shenhe',
      });
    },
    addRow() {
      const newTableData = [...this.data.tableData];
      const newRow = { field: '', percentage: '', modifyTime: '', modifier: '' };
      newTableData.push(newRow);
      this.setData({ tableData: newTableData });
    },
  
    handleFieldInput(e) {
      const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      const tableData = [...this.data.tableData];
      tableData[index].field = value;
      this.setData({ tableData });
    },
  
    handlePercentageInput(e) {
      const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      const tableData = [...this.data.tableData];
      tableData[index].percentage = value;
      this.setData({ tableData });
    },
  
    handleModifyTimeInput(e) {
      const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      const tableData = [...this.data.tableData];
      tableData[index].modifyTime = value;
      this.setData({ tableData });
    },
  
    handleModifierInput(e) {
      const { index } = e.currentTarget.dataset;
      const { value } = e.detail;
      const tableData = [...this.data.tableData];
      tableData[index].modifier = value;
      this.setData({ tableData });
    },
 
    navToSearchPage() {
      wx.navigateTo({
        url: '/pages/goods/search/index'
      });
    },
    data: {
      scrollHeight: 0, // 初始高度为0
      tableHeight: 'auto',
      formData: {
        name: '',
        age: '',
        gender: ''
      }

    },

    navigateToNewShenhe: function() {
      wx.navigateTo({
        url: '/pages/new shenhe/new shenhe',
      });
    },
    onInputChange(e) {
      const { key } = e.currentTarget.dataset;
      const { value } = e.detail;
      const formData = { ...this.data.formData, [key]: value };
      this.setData({ formData });
  
      // 计算表格高度
      const rowHeight = 50; // 单元格行高
      const rowCount = Object.keys(formData).length; // 行数
      const newTableHeight = `${rowCount * rowHeight}px`;
      this.setData({ tableHeight: newTableHeight });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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