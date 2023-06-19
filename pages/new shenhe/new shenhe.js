Page({
  data: {
    formRows: [
      {
        id: 0,
        fields: [
          { placeholder: "项目领域" },
          { placeholder: "百分比" },
          { placeholder: "修改时间" },
          { placeholder: "修改人" },
        ],
      },
    ],
  },

  addRow() {
    const formRows = this.data.formRows;
    const newRow = {
      id: formRows.length,
      fields: [
        { placeholder: "项目领域" },
        { placeholder: "百分比" },
        { placeholder: "修改时间" },
        { placeholder: "修改人" },
      ],
    };
    formRows.push(newRow);
    this.setData({ formRows });
  },

  deleteRow() {
    const formRows = this.data.formRows;
    if (formRows.length > 1) {
      formRows.pop();
      this.setData({ formRows });
    } else {
      // 提示无法删除最后一行
      wx.showToast({
        title: '无法删除最后一行',
        icon: 'none',
        duration: 2000,
      });
    }
  },

  saveData() {
    // 保存用户输入的数据并跳转到 pages/shenhe 页面
    wx.navigateTo({ url: "/pages/shenhe/shenhe" });
  },
});