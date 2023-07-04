// components/taskcard/taskcard.js
function generateRange(start, end) {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}

Component({
  properties: {
    cardId: {
      type: String,
      value: "",
    },
    taskData: {
      type: Object,
      value: {},
    },
  },
  data: {
    time: [0, 0, 0], // 初始化time数组
    timeRange: [
      generateRange(0, 365), // 天数范围：0-365
      generateRange(0, 23), // 小时范围：0-23
      generateRange(0, 59) // 分钟范围：0-59
    ],
    feedbackRatioIndex:[100],
    feedbackRatioRange: generateRange(0, 100).map(num => `${num}%`), // 使用 generateRange 方法创建0%到100%的整数选项
    showInput: false,
    feedbackRatio: ""
  },
  methods: {
    deleteCard: function () {
      this.triggerEvent("delete", { id: this.data.cardId });
    },
    timeChange: function (e) {
      this.setData({
        time: e.detail.value
      });
    },
    handleSubmit: function (e) {
      const formData = e.detail.value;
      this.triggerEvent("taskcardSubmit", formData);
    },
  },
});
Page({
  data: {
    feedbackRatioRange: [100],
    feedbackRatioIndex: 0,
    showInput: false,
    time: [0, 0, 0], // 初始化time数组
    timeRange: [
      generateRange(0, 365), // 天数范围：0-365
      generateRange(0, 23), // 小时范围：0-23
      generateRange(0, 59) // 分钟范围：0-59
    ]
  
  },
  timeChange: function (e) {
    this.setData({
      time: e.detail.value
    });
  },
  // 监听回馈比选择器变化
  feedbackRatioChange(e) {
    this.setData({
      feedbackRatioIndex: parseInt(e.detail.value, 10) // 将字符串转换为整数
    });
    if (this.data.feedbackRatioRange.length === 1 && this.data.feedbackRatioRange[0] === 100) {
      this.setData({
        showInput: true,
        feedbackRatioIndex: e.detail.value[0] // 获取 picker-view 的值并设置 feedbackRatioIndex
      });
    } else {
      this.setData({
        showInput: false
      });
    }
  },
  inputRatio(e) {
    this.setData({
      feedbackRatio: e.detail.value
    });
  },

  addRatio() {
    let ratioArr = this.data.feedbackRatioRange
    ratioArr.push(ratioArr[ratioArr.length - 1] + 10)
    this.setData({
      feedbackRatioRange: ratioArr,
      showInput: false
    })
  } ,
  

  deleteCard: function (e) {
    const index = e.currentTarget.dataset.index;
    const cards = this.data.cards.slice();
    cards.splice(index, 1);
    this.setData({
      cards: cards
    });
    // 触发一个自定义事件，将 id 作为 detail 传递给父组件
  this.triggerEvent('delete', { id: this.data.id });
  },
  

   // 生命周期函数--监听页面加载
   onLoad: function (options) {
    // 设置初始的回馈比范围为 100%
    this.setData({
      feedbackRatioRange: [100],
    });
  },
 // 添加一个点击事件处理函数



  dateChange: function (e) {
    const index = e.detail.value;
    const feedbackRatio = this.data.feedbackRatioRange[index];
    this.setData({
      feedbackRatio: feedbackRatio,
    });
  },
});
