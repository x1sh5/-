// pages/talk/talk.ts

let socketOpen = false
let socketMsgQueue:any = []


wx.onSocketOpen(function(res) {
  socketOpen = true
  for (let i = 0; i < socketMsgQueue.length; i++){
    sendSocketMessage(socketMsgQueue[i])
  }
  socketMsgQueue = []
})

function sendSocketMessage(msg:any) {
  if (socketOpen) {
    wx.sendSocketMessage({
      data:msg,
      inputmsag:"",
      success:(scs)=>{
        console.log("发送成功:"+msg)
        console.log(scs)
      },
      fail:(errMsg)=>{
        console.log("发送失败")
        console.log(errMsg)
      }
    })
  } else {
    socketMsgQueue.push(msg)
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcomemsg:"连接成功",
    socketMsgQueue: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
      wx.connectSocket({
      url: 'wss://www.wangyan.net/ws',
      success:()=>{
        wx.showToast({
          title:this.data.welcomemsg
        })
      }
    }),
    wx.onSocketMessage((res)=>{
      console.log("recive message")
      console.log(res);
      let array0 = this.data.socketMsgQueue;
      array0.push({content:res.data})
      this.setData({
        socketMsgQueue:array0
      })
    })

    wx.onSocketClose((res)=>{
      console.log("SocketClose")
      console.log(res)
    })

    wx.onSocketError((res)=>{
      console.log("SocketError")
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  sendMessage(e:any){
    let inputmsg = e.detail.value.mssg
    console.log(inputmsg)
    sendSocketMessage(e.detail.value.mssg);
    let array0 = this.data.socketMsgQueue;
    array0.push({content:inputmsg})
    this.setData({
      socketMsgQueue:array0,
      inputmsag:""
    })

  }
})