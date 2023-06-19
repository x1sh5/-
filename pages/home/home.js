import {
  fetchHome
} from '../../services/home/home';
import {
  fetchGoodsList
} from '../../services/good/fetchGoods';

async function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    const app = getApp();
    wx.request({
      //直接使用地址拼接
      url: `${app.globalData.apiBaseUrl}/Assignment/`+(isNaN(parseInt(userId))?'':userId),
      method: "GET",
      // data 模式会转换成url参数，也就是url会转换成 ${app.globalData.apiBaseUrl}/Assignment?userId=
      //但真实的请求应该是 ${app.globalData.apiBaseUrl}/Assignment/userId
      // data: {
      //   userId: userId,
      // },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

Page({
  data: {
    tasks: [],
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    isRegistered: false,
    showRegisterPrompt: false,
    navigation: {
      type: 'dots'
    },
    swiperImageProps: {
      mode: 'scaleToFill'
    },
    users: [],
    username: '',
    email: '',
    articles: []
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  handleArticleClick(event) {
    const article = event.currentTarget.dataset.article;

    if (!this.data.isRegistered) {
      // 如果用户未注册，显示弹窗
      this.setData({ showRegisterPrompt: true });
    } else {
      // 如果用户已经注册，允许查看文章详情
      wx.navigateTo({
        url: `/pages/goods/details/index?id=${article.id}`,
      });
    }
  },

  handleRegisterClick() {
    // 用户点击了“去注册”按钮，跳转到注册页面
    wx.navigateTo({
      url: '/pages/register/register',
    });
  },

  handleCloseClick() {
    // 关闭弹窗
    this.setData({ showRegisterPrompt: false });
  },

  onShow:async function () {
    //loadHomePage()函数
    this.loadHomePage();
    try {
      const data = await fetchUserData();

      console.log(data.$values);  // 查看返回的数据
      this.setData({
        //使用data.$values,我使用后端框架的默认数据格式，后面会调整
        tasks: data.$values
      });
    } catch (error) {
      console.error("Error getting data from the API:", error);
    }
  },

  onLoad:async function (options) {
    const { userId } = options;
    try {
      const data = await fetchUserData(userId);

      console.log(data);  // 查看返回的数据
      const { username, email } = data;
      this.setData({
        username: username,
        email: email,
      });
    } catch (error) {
      console.error("Error getting data from the API:", error);
    }
  },

  fetchArticles() {
    // 示例：使用 setTimeout 模拟异步请求
    setTimeout(() => {
      this.setData({
        articles: [
          // 您的实际文章数据
        ],
      });
    }, 1000);
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

 loadHomePage: function(){
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper, tabList }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        pageLoading: false,
      });

      const tabIndex = this.privateData.tabIndex;
      const filteredGoodsList = this.data.goodsList.filter(item => item.tabKey === tabIndex);

      this.setData({
        goodsList: filteredGoodsList,
        goodsListLoadStatus: 0,
      });

      this.loadGoodsList(true);
    });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({
      goodsListLoadStatus: 1
    });

    const pageSize = this.goodListPagination.num;
    let pageIndex = this.privateData.tabIndex * pageSize + this.goodListPaginationindex;

    if (fresh) {
      pageIndex = 0;
    }

    const goodsList = await fetchGoodsList({
      pageSize,
      pageIndex,
    });

    const newGoodsList = goodsList.map((item) => {
      return {
        ...item,
        tabKey: this.privateData.tabIndex,
      };
    });

    let finalGoodsList;

    if (fresh) {
      finalGoodsList = newGoodsList;
    } else {
      finalGoodsList = this.data.goodsList.concat(newGoodsList);
    }

    this.setData({
      goodsList: finalGoodsList,
      goodsListLoadStatus: goodsList.length > 0 ? 0 : 2,
    });

    if (fresh) {
      this.goodListPagination.index = 1;
    } else {
      this.goodListPagination.index += 1;
    }
  },
});