import { config, cdnBase } from '../../config/index';

/** 获取首页数据 */
function mockFetchHome() {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(),
      tabList: [
        {
          text: '实时',
          key: 0,
      
        },
        {
          text: '推荐',
          key: 1,
        },
        {
          text: '审核',
          key: 2,
        },
        {
          text: '制作',
          key: 3,
        },
        {
          text: '技术',
          key: 4,
        },
        {
          text: '建设',
          key: 5,
        },
        {
          text: '资金',
          key: 6,
        },
        {
          text: '分发',
          key: 7,
        },
      ],
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome() {
  if (config.useMock) {
    return mockFetchHome();
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
