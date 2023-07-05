import updateManager from './common/updateManager';

App({
  onLaunch: function (options) {
    const that = this;
    this.GetBranchs(function(branchs:any) {
      that.globalData.branchs = branchs;
    });
    this.GetTaskTypes(function(tasktypes:any) {
      that.globalData.tasktypes = tasktypes;
    });
  },
  globalData: {
    taskData: {},
    branchs:[],
    tasktypes:[],
    username: "",
    email: "",
    apiBaseUrl: "https://localhost:7221/api" // 替换为您的实际 API 地址
  },
  onShow: function () {
    updateManager();

  },
  //部门信息
  GetBranchs: function(func:Function):[]{
    return this.GetInfo("/Information/branchs",func);
  },
  //任务类型信息
  GetTaskTypes: function(func:Function):[]{
    return this.GetInfo("/Information/customtypes",func);
  },
  //获取信息
  GetInfo:function(urlpath:string, callback:Function) {

    let info:any;
    wx.request({
      url:this.globalData.apiBaseUrl+urlpath,
      success:function(res){
        console.log(res.statusCode)
        if(res.statusCode == 200){
          callback(res.data["$values"])
        }
      },
      fail(err){
        console.log(err.errMsg)
        wx.showModal({
          title:"网络出错",
          content:err.errMsg
        })
      }
    })
    return info;
  },
});