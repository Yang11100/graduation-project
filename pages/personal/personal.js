var app = getApp()
var Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userinfo: {}
  },
  onLoad: function(options) {
    console.log('s')
    if(wx.getStorageSync('bmob')) {
      this.data.userinfo = JSON.parse(wx.getStorageSync('bmob'))
    }
    if (this.data.userinfo.sessionToken) {
      console.log('cc')
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  // 页面初始化 options为页面跳转所带来的参数

  onShow: function() {
    // 页面显示.
  },

  listmybook: function() {
    // 我的预订
    wx.redirectTo({
      url: '../mybook/mybook'
    })
  },
  listchangeperinfo: function() {
    // 我的预订
    wx.redirectTo({
      url: '../changeperinfo/changeperinfo'
    })
  },
  exitlogin: function(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('username')
          //页面跳转
          wx.redirectTo({
            url: '../login/login'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getScanning: function() {
    app.getScanning()
  }
})
