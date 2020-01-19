//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img5.imgtn.bdimg.com/it/u=2694923166,2219113479&fm=26&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=198437993,3306270292&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=4069497681,1728256116&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=3180806136,1967627276&fm=26&gp=0.jpg'
    ],

    listItems: ['', '', ''],

  },
  //事件处理函数

  // onLoad: function () {

  // },
  loginbtnclick: function () {
    wx.switchTab({
      //只适用于调转到设置了tabbar的页面
      //navigateTo此方法能够从跳转的页面会回到当前页面;
      //  wx.redirectTo 方法跳转会关闭当前页面跳转到某个页面; 
      // wx.reLaunch 方法跳转会关闭所有打开的页面，跳转到某个页面; 
      // wx.navigateBack 方法返回到父页面 ，可以多级返回
      url: '../mine/mine',
    })
  },
  resourcestap: function () {
    wx.navigateTo({
      url: '../booking/booking',
    })
  },
  reservetap: function () {
    wx.navigateTo({

      url: '../reserve/reserve?id=1',
    })
  },

})