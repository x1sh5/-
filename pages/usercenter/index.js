import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';


const menuData = [
  [
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center',
    },
    {
      title: '技能互助档案',
      tit: '',
      url: '',
      type: 'point',
    },
    {
      title: '银行卡绑定',
      tit: '',
      url: '',
      type: 'address',
      path: '/pages/bindBankCard/bindBankCard', // 添加要跳转的页面路径
     
    },
    {
      title: '收益来源',
      tit: '',
      url: '',
      type: 'coupon',
    },
    
    
  ],

];

const orderTagInfos = [{
  title: '历史发布',
  iconName: 'member',
  orderNum: 0,
  tabType: 5,
  status: 0,
},
{
  title: '完成项目',
  iconName: 'done',
  orderNum: 0,
  tabType: 10,
  status: 0,
},
{
  title: '浏览记录',
  iconName: 'list',
  orderNum: 0,
  tabType: 40,
  status: 0,
},
{
    title: '草稿箱',
    iconName: 'label',
    orderNum: 0,
    tabType: 60,
    status: 0,
  },


];
const orderTagInfos2 = [{
  title: '任务提醒',
  iconName: 'alarm clock',
  orderNum: 0,
  tabType: 5,
  status: 0,
},
{
  title: '当前需求',
  iconName: 'compass',
  orderNum: 0,
  tabType: 10,
  status: 0,
},
{
  title: '文件管理',
  iconName: 'package',
  orderNum: 0,
  tabType: 40,
  status: 0,
},
{
  title: '历史任务',
  iconName: 'classify',
  orderNum: 0,
  tabType: 60,
  status: 0,
},


];


const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    phoneNumber: '',
  },
  menuData,
  orderTagInfos,
  orderTagInfos2,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
});

Page({
  data:
 
  getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.fetUseriInfoHandle();
  },

  fetUseriInfoHandle() {
    fetchUserCenter().then(
      ({
        userInfo,
        countsData,
        orderTagInfos: orderInfo,
        orderTagInfos2: orderTagInfos2,
        customerServiceInfo,
      }) => {
        // eslint-disable-next-line no-unused-expressions
        menuData?.[0].forEach((v) => {
          countsData.forEach((counts) => {
            if (counts.type === v.type) {
              // eslint-disable-next-line no-param-reassign
              v.tit = counts.num;
            }
          });
        });
        const info = orderTagInfos.map((v, index) => ({
          ...v,
          ...orderInfo[index],
        }));
        this.setData({
          userInfo,
          menuData,
          orderTagInfos: info,
          orderTagInfos2: orderTagInfos2,
          customerServiceInfo,
          currAuthStep: 2,
        });
        wx.stopPullDownRefresh();
      },
    );
  },

  onClickCell({
    currentTarget
  }) {
    const {
      type
    } = currentTarget.dataset;

    switch (type) {
      case 'address': {
        wx.navigateTo({
          url: '/pages/order/bindBankCard/index'
        });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了帮助中心',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'point': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了积分菜单',
          icon: '',
          duration: 1000,
        });
        break;
      }
  
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.tabType;

    if (status === 0) {
      wx.navigateTo({
        url: '/pages/drafts/drafts'
      });
    } else {
      wx.navigateTo({
        url: `/pages/order/order-list/index?status=${status}`
      });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({
      url: '/pages/order/order-list/index'
    });
  },
  
  jumpNav2(e) {
    const status = e.detail.tabType;

    if (status === 0) {
      wx.navigateTo({
        url: '/pages/drafts/drafts/index'
      });
    } else {
      wx.navigateTo({
        url: `/pages/order/order-list2/index?status=${status}`
      });
    }
  },

  jumpToOtherPage() {
    wx.navigateTo({
      url: '/pages/order/order-list2/index'
    });
  },


  openMakePhone() {
    this.setData({
      showMakePhone: true
    });
  },

  closeMakePhone() {
    this.setData({
      showMakePhone: false
    });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const {
      currAuthStep
    } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({
        url: '/pages/usercenter/person-info/index'
      });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const {
      version,
      envVersion = __wxConfig
    } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});