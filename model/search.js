import { getGoodsList } from './goods';

/**
 * @param {number} sort
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} minPrice
 * @param {number} maxPrice
 * @param {string} keyword
 */

export function getSearchHistory() {
  return {
    historyWords: [
      '职业',
      '工益发餐',
      '运载',
      '看病',
      '产品制作',
      '空调维修',
      '法语教学',
      '家教',
      '插画',
    
    ],
  };
}

export function getSearchPopular() {
  return {
    popularWords: [
      '职业',
      '工益发餐',
      '运载',
      '看病',
      '产品制作',
      '空调维修',
      '法语教学',
      '家教',
      '插画',
    
    ],
  };
}

export function getSearchResult() {
  return {
    saasId: null,
    storeId: null,
    pageNum: 1,
    pageSize: 30,
    totalCount: 1,
    spuList: getGoodsList(7),
    algId: 0,
  };
}
