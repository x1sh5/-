const app = getApp();

Page({
  data: {
    cards: [
      { id: '1'},
      
    ],
    submittedTaskData: [],
    nextId: 1,
    name: '',
    description: '',
    task: {
      content: '',
      abbreviation: '',
      feedback_ratio: 0,
      estimated_hours: 0,
      card_giver: '',
      task_description: '',
      zhizuoCards: [] // 确保在这里初始化 zhizuoCards
    },
    // 其他数据如feedbackRatioRange，timeRange等
  },


  addtaskcard: function () {
    // 添加一个新的 AuditCard 组件，并分配一个唯一的编号
    const newCard = {
      id: `ORDER${this.data.nextId.toString().padStart(6, "0")}`,
      type: 'taskcard',
      data: {
        // 设置默认的 taskcard 数据
        
        // 其他默认属性...
      },
    };
    const newCards = this.data.cards.concat(newCard);
    this.setData({
      cards: newCards,
      nextId: this.data.nextId + 1, // 递增 nextId，以便下一个组件具有唯一的编号
    });
  },
 // 在这里实现添加新卡片的逻辑
  addCard: function() {
    // 添加一个新的卡片组件，并分配一个唯一的编号
    const newCard = {
      id: `ORDER${this.data.nextId.toString().padStart(6, "0")}`,
      type: 'card'
    };
    const newtaskcard = this.data.taskcard.concat(newCard);
    this.setData({
      taskcard: newtaskcard,
      nextId: this.data.nextId + 1 // 递增 nextId，以便下一个组件具有唯一的编号
    });
  },

  deleteTaskCard: function (e) {
    const id = e.detail.id;
    const index = this.data.cards.findIndex(item => item.id === id);
  
    if (index !== -1) {
      let cards = this.data.cards;
      cards.splice(index, 1);
      this.setData({ cards });
    }
  },

  deleteCard() {
    // 处理删除卡片的逻辑，可以使用页面数据的方式删除对应的卡片数据
    // 例如，从卡片列表中移除当前卡片
    const cardList = this.data.cardList;
    const index = cardList.indexOf(this.data.currentCard);
    if (index > -1) {
      cardList.splice(index, 1);
      this.setData({ cardList });
    }
  },

  handleTaskcardSubmit: function (e) {
    const taskData = e.detail;
    this.setData({
      submittedTaskData: [...this.data.submittedTaskData, taskData],
    });
  },

 // 为每个任务设置卡片编号和统一的组号
  publishTasks: function () {
    const { submittedTaskData } = this.data;

    submittedTaskData.forEach((taskData, index) => {
      // 为每个任务设置卡片编号和统一的组号
      taskData.cardId = index + 1;
      taskData.groupId = 1;

      // 在这里，你可以为每个任务创建一个单独的页面
      // 由于没有接入后端服务器，暂时只将任务数据打印到控制台
      console.log("创建任务页面:", taskData);
    });

    // 重置 submittedTaskData
    this.setData({ submittedTaskData: [] });
  },


  submit: function (e) {
    const taskData = e.detail.value;
    wx.request({
      url: 'https://www.wangyan.net/api/Assignment', // 你的后端API接口地址
      method: 'POST',
      data: taskData,
      success: (res) => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '任务已提交',
            icon: 'success',
            duration: 2000
          });
          // 处理其他成功逻辑，如跳转到其他页面
        } else {
          wx.showToast({
            title: '提交失败，请重试',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  handleNameInput(e) {
    this.setData({
      name: e.detail.value,
    });
  },
  handleDescInput(e) {
    this.setData({
      description: e.detail.value,
    });
  },
  handleSubmit(e) {
    const formData = e.detail;
    // 将 formData 保存到全局变量中
    getApp().globalData.taskData = formData;
    // 导航到 goods/details 页面
    // 将数据传递给商品详情页面
    wx.navigateTo({
      url: `/pages/goods/details/index?name=${this.data.name}&description=${this.data.description}`,
    });
  },
  onLoad: function () {
    this.setData({
      cards: app.globalData.cards,
    });
  },

  feedbackRatioChange(e) {
    const newIndex = parseInt(e.detail.value, 10);
    this.setData(
      {
        feedbackRatioIndex: newIndex
      },
      () => {
        if (this.data.feedbackRatioRange.length === 1 && this.data.feedbackRatioRange[0] === 100) {
          this.setData({
            showInput: true
          });
        } else {
          this.setData({
            showInput: false
          });
        }
      }
    );
  },
  saveDraft: function () {
    // 在这里实现保存草稿的逻辑
    // 假设已经将草稿数据存储在了 this.data.cards 中
    // 可以将数据存储到 storage 或者发送给服务器

    wx.setStorage({
      key: 'drafts',
      data: this.data.cards,
      success: function () {
        // 弹出提示
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function () {
        // 弹出提示
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },


  button1Click() {
    wx.navigateTo({
      url: '/pages/order/order-list/index',
    });
  },

  button2Click() {
    // 将用户的改动保存到本地缓存中
    wx.setStorageSync('draft', this.data); // 假设 this.data 包含用户的改动数据

    wx.navigateTo({
      url: '/pages/drafts/drafts',
    });
  },

  button3Click() {
    wx.navigateTo({
      url: '/pages/shenhe/shenhe',
    });
  },
  button4Click() {
    wx.navigateTo({
      url: "/components/taskcard/taskcard",
    });
  },
  button5Click() {
    // 在这里实现保存草稿的逻辑
    // 假设已经将草稿数据存储在了 this.data.cards 中
    // 可以将数据存储到 storage 或者发送给服务器

    wx.setStorage({
        key: 'drafts',
      data: this.data.cards,
      success: function () {
        // 弹出提示
        wx.showToast({
          title: '保存成功！',
          icon: 'success',
          duration: 2000
        });
      },
      fail: function () {
        // 弹出提示
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 2000
        });
      },
    });


  
      // 跳转到首页
      wx.switchTab({
        url: '/pages/home/home',
      });
    },
  
    // 保存草稿
    saveDraft() {
      // 保存草稿的逻辑
      // ...
    },


  toggleChoice: function() {
    const isChoosingImage = !this.data.isChoosingImage;
    this.setData({
      isChoosingImage: isChoosingImage
    });
    if (isChoosingImage) {
      wx.setNavigationBarTitle({
        title: '选择图片'
      });
    } else {
      wx.setNavigationBarTitle({
        title: '选择文件'
      });
    }
  },

  chooseFile: function() {
    wx.showActionSheet({
      itemList: ['选择图片', '选择文件'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.chooseImage();
        } else if (res.tapIndex === 1) {
          this.chooseFileFromSystem();
        }
      }
    });
  },

  chooseImage: function() {
    wx.chooseImage({
      count: 9,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        const imageList = this.data.imageList.concat(tempFilePaths);
        this.setData({
          isChoosingImage: true,
          imageList: imageList
        });
      }
    });
  },

  chooseFileFromSystem: function() {
    wx.chooseMessageFile({
      count: 9,
      type: 'all',
      success: (res) => {
        const tempFiles = res.tempFiles;
        const fileList = this.data.fileList.concat(tempFiles);
        this.setData({
          isChoosingImage: false,
          fileList: fileList
        });
      }
    });
  },

  

  bindreset: function (e) {
    this.saveDraft(e);
  },

  submit: function (e) {

    if (this.data.loading) {
      return;
    }
    let u = e.detail.value;
    if (!u.nickname) {
      wx.showToast({
        title: "请输入昵称",
        icon: "error",
      });
      return;
    }
    if (!u.gender) {
      wx.showToast({
        title: "请选择回馈比",
        icon: "error",
      });
      return;
    }
    if (!u.date) {
      wx.showToast({
        title: "请预计完成任务花费的时间",
        icon: "error",
      });
      return;
    }
    if (!u.code) {
      wx.showToast({
        title: "请填写需求内容",
        icon: "error",
      });
      return;
    }
    if (!u.info) {
      wx.showToast({
        title: "请填写任务说明",
        icon: "error",
      });
      return;
    }
    this.setData({
      loading: true,
    });
    wx.showLoading({});

    if (this.data.groupId) {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "joinGroup",
            data: {
              ...u,
              age: new Date().getFullYear() - this.data.date,
              region: this.data.region,
              groupId: Number(this.data.groupId),
            },
          },
        })
        .then((res) => {
          this.setData({
            loading: false,
          });
          wx.hideLoading();

          if (res.result.success) {
            wx.setStorageSync("groupId", this.data.groupId);
            wx.redirectTo({
              url: "/pages/tip/index?groupId=" +
                this.data.groupId +
                "&code=" +
                res.result.code,
            });
          } else {
            wx.showModal({
              title: "提示",
              content: res.result.errorMessage,
              success: function () {
                wx.navigateBack({
                  delta: 1,
                });
              },
            });
          }
        });
    } else {
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: {
            type: "createGroup",
            data: {
              ...u,
              age: new Date().getFullYear() - this.data.date,
              region: this.data.region,
            },
          },
        })
        .then((res) => {
          wx.setStorageSync("groupId", res.result.groupId);
          this.setData({
            loading: false,
          });
          wx.hideLoading();
          wx.redirectTo({
            url: "/pages/tip/index?groupId=" + String(res.result.groupId),
          });
        });
    }
  },

  
  dateChange: function (e) {
    const index = e.detail.value;
    const feedbackRatio = this.data.feedbackRatioRange[index];
    this.setData({
      feedbackRatio: feedbackRatio,
    });
  },

  timeChange: function (e) {
    const indexArray = e.detail.value;
    const timeRange = this.data.timeRange;
    const time = [
      timeRange[0][indexArray[0]],
      timeRange[1][indexArray[1]],
      timeRange[2][indexArray[2]]
    ];
    this.setData({
      time: time,
    });
  },

  regionChange: function (e) {
    this.setData({
      region: e.detail.value,
    });
  },
 
   // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // 设置初始的回馈比范围为 100%
    this.setData({
      feedbackRatioRange: [100],
    });
  },
 // 添加一个点击事件处理函数


  // 监听回馈比选择器变化
  feedbackRatioChange: function (e) {
    const selectedRatioIndex = e.detail.value; // 当前选择的回馈比索引
    const selectedRatio = this.data.feedbackRatioRange[selectedRatioIndex]; // 当前选择的回馈比
    const remainingRatio = 100 - selectedRatio; // 计算剩余的百分比范围
    const remainingRange = [remainingRatio]; // 构造剩余的百分比范围数组

    this.setData({
      feedbackRatioRange: remainingRange,
      feedbackRatioIndex: selectedRatioIndex,
    });
  },
  handleDeleteCard: function (e) {
    const id = e.detail.id;
    const cards = this.data.cards.filter((card) => card.id !== id);
    this.setData({
      cards: cards
    });
  },



  addAudit: function () {
    // 在这里实现添加审核卡片的逻辑
    this.setData({
      cards: [...this.data.cards, { type: 'audit' }]
    });
  },
  
  addInfo: function () {
    // 在这里实现添加信息卡片的逻辑
  },
  
  addTech: function () {
    // 在这里实现添加技术卡片的逻辑
  },
  
  addFund: function () {
    // 在这里实现添加资金卡片的逻辑
  },
  
  addDistribution: function () {
    // 在这里实现添加分发卡片的逻辑
  },
  
  addConstruction: function () {
    // 在这里实现添加建设卡片的逻辑
  },
  
  addProduction: function () {
    // 在这里实现添加制作卡片的逻辑
  },

// 处理表单提交事件
  submitData: function (e) {
    const data = {
      title: e.detail.value.title,
      description: e.detail.value.description,
    };

    this.uploadData(data);
  },

  uploadData: function (data) {
    const url = 'https://www.wangyan.net/api/Assignment'; 

    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: (res) => {
        console.log('数据上传成功：', res.data);
        // 您可以在这里处理上传成功的情况，例如显示成功提示或更新页面数据
      },
      fail: (error) => {
        console.error('数据上传失败：', error);
        // 您可以在这里处理上传失败的情况，例如显示错误提示
      },
    });
  },

})


