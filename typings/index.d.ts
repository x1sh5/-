/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}

interface Branch{
  $id:string,
  id:number,
  name:string,
  description:string
}

interface TaskType extends Branch{
  level:number
}