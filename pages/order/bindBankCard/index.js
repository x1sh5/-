import { saveBankCard } from './api';

Page({
  data: {
    bankCardNumber: '',
    submitActived: false,
    submitting: false,
  },

  onLoad() {
    this.setWatcher('bankCardNumber', this.checkParams.bind(this));
  },

  setWatcher(key, callback) {
    let lastData = this.data;
    const keys = key.split('.');
    keys.slice(0, -1).forEach((k) => {
      lastData = lastData[k];
    });
    const lastKey = keys[keys.length - 1];
    this.observe(lastData, lastKey, callback);
  },

  observe(data, k, callback) {
    let val = data[k];
    Object.defineProperty(data, k, {
      configurable: true,
      enumerable: true,
      set: (value) => {
        val = value;
        callback();
      },
      get: () => {
        return val;
      },
    });
  },

  onInput(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({ [key]: value });
  },

  checkParams() {
    const res = { errMsg: '', require: false };

    if (!this.data.bankCardNumber) {
      res.errMsg = '请填写银行卡号';
      res.require = true;
    }

    this.setData({ submitActived: !res.require });
    return res;
  },

  onSubmit() {
    const checkRes = this.checkParams();
    if (checkRes.errMsg) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: checkRes.errMsg,
        icon: '',
      });
      return;
    }

    const { bankCardNumber } = this.data;

    const params = {
      bankCardNumber,
    };
    this.setData({ submitting: true });
    saveBankCard(params)
      .then(() => {
        this.setData({ submitting: false });
        Toast({
          context: this,
          selector: '#t-toast',
          message: '保存成功',
          icon: '',
        });
        setTimeout(() => wx.navigateBack({ backRefresh: true }), 1000);
      })
      .catch(() => {
        this.setData({ submitting: false });
      });
  },
});