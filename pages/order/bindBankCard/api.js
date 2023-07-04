export function saveBankCard(params) {
  // 假设的服务器 API 端点，请根据实际情况进行修改
  const apiUrl = 'https://your-server-api.com/saveBankCard';
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl,
      method: 'POST',
      data: params,
      success: (res) => {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}