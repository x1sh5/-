// components/taskcard/taskcard.js
function generateRange(start, end) {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
}
var editorBehavor = require('./Behavor1')
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
    task:{branchid:1},
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
  behaviors:[editorBehavor],
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
})
