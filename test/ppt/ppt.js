// test/ppt/ppt.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img2.imgtn.bdimg.com/it/u=2129074038,3694525338&fm=26&gp=0.jpg',
      'http://img1.imgtn.bdimg.com/it/u=351090140,365414765&fm=26&gp=0.jpg',
      'http://img4.imgtn.bdimg.com/it/u=3192367593,4275835055&fm=26&gp=0.jpg'
    ]

  },
  loginbtnclick:function(){
    wx.switchTab({
      url: '../mine/mine',
    })
  },

  
})