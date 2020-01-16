// pages/mine/mine.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:null,
    abc1:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.query)
    
    if(app.userData.username==null){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    else{
      this.setData({username:app.userData.username})
    }
    
  
  },


})