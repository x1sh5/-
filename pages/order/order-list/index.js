import {
  OrderStatus
} from '../config';
import {
  fetchOrders,
  fetchOrdersCount,
} from '../../../services/order/orderList';
import {
  cosThumb
} from '../../../utils/util';

Page({
  page: {
    size: 5,
    num: 1,
  },

  data: {
    tabs: [
      {
        key: OrderStatus.PENDING_PAYMENT,
        text: '历史发布',
        info: ''
      },
      {
        key: OrderStatus.PENDING_DELIVERY,
        text: '完成项目',
        info: ''
      },
      {
        key: OrderStatus.PENDING_RECEIPT,
        text: '浏览记录',
        info: ''
      },

    ],
    curTab: -1,
    orderList: [],
    listLoading: 0,
    pullDownRefreshing: false,
    emptyImg: 'https://cdn-we-retail.ym.tencent.com/miniapp/order/empty-order-list.png',
    backRefresh: false,
    status: -1,
  },

  onLoad(query) {
    let status = parseInt(query.status);
    status = this.data.tabs.map((t) => t.key).includes(status) ? status : -1;
    this.init(status);
    this.pullDownRefresh = this.selectComponent('#wr-pull-down-refresh');
  },

  onShow() {
    if (!this.data.backRefresh) return;
    this.onRefresh();
    this.setData({
      backRefresh: false
    });
  },

  onReachBottom() {
    if (this.data.listLoading === 0) {
      this.getOrderList(this.data.curTab);
    }
  },

  onPageScroll(e) {
    this.pullDownRefresh && this.pullDownRefresh.onPageScroll(e);
  },

  onPullDownRefresh_(e) {
    const {
      callback
    } = e.detail;
    this.setData({
      pullDownRefreshing: true
    });
    this.refreshList(this.data.curTab)
      .then(() => {
        this.setData({
          pullDownRefreshing: false
        });
        callback && callback();
      })
      .catch((err) => {
        this.setData({
          pullDownRefreshing: false
        });
        Promise.reject(err);
      });
  },

  init(status) {
    status = status !== undefined ? status : this.data.curTab;
    this.setData({
      status,
    });
    this.refreshList(status);
  },

  getOrderList(statusCode = -1, reset = false) {
    const params = {
      parameter: {
        pageSize: this.page.size,
        pageNum: this.page.num,
      },
    };
    if (statusCode !== -1) params.parameter.orderStatus = statusCode;
    this.setData({
      listLoading: 1
    });
    return fetchOrders(params)
      .then((res) => {
        this.page.num++;
        let orderList = [];
        if (res && res.data && res.data.orders) {
          orderList = (res.data.orders || []).map((order) => {
            if (statusCode === OrderStatus.PENDING_PAYMENT && !order.published ||
                statusCode === OrderStatus.PENDING_DELIVERY && !order.completed ||
                statusCode === OrderStatus.PENDING_RECEIPT && !order.browsed) {
              return null;
            }
            return {
              id: order.orderId,
              orderNo: order.orderNo,
              parentOrderNo: order.parentOrderNo,
              storeId: order.storeId,
              storeName: order.storeName,
              status: order.orderStatus,
              statusDesc: order.orderStatusName,
              amount: order.paymentAmount,
              totalAmount: order.totalAmount,
              logisticsNo: order.logisticsVO.logisticsNo,
              createTime: order.createTime,
              goodsList: (order.orderItemVOs || []).map((goods) => ({
                id: goods.id,
                thumb: cosThumb(goods.goodsPictureUrl, 70),
                title: goods.goodsName,
                skuId: goods.skuId,
                spuId: goods.spuId,
                specs: (goods.specifications || []).map(
                  (spec) => spec.specValue,
                ),
                price: goods.tagPrice ? goods.tagPrice : goods.actualPrice,
                num: goods.buyQuantity,
                titlePrefixTags: goods.tagText ? [{
                  text: goods.tagText
                }] : [],
              })),
              buttons: order.buttonVOs || [],
              groupInfoVo: order.groupInfoVo,
              freightFee: order.freightFee,
            };
          }).filter(order => order);
        }
        if (orderList.length === 0) {
          this.setData({
            emptyText: '暂无任务信息',
          });
        }
        return new Promise((resolve) => {
          if (reset) {
            this.setData({
              orderList:orderList,
            }, () => {
              resolve(orderList);
            });
          } else {
            this.setData({
              orderList: [...this.data.orderList, ...orderList],
            }, () => {
              resolve(orderList);
            });
          }
        });
      })
      .finally(() => {
        this.setData({
          listLoading: 0,
        });
      });
  },

  refreshList(statusCode = -1) {
    if (this.data.status !== statusCode) {
      this.setData({
        curTab: statusCode,
      });
    }
    this.page.num = 1;
    return this.getOrderList(statusCode, true);
  },

  switchTab(e) {
    const status = e.target.dataset.status;
    if (status === this.data.curTab) return;
    this.init(status);
  },

  onRefresh() {
    this.refreshList(this.data.curTab);
  },
});