// pages/admin/admin.js
const app = getApp()
Page({
  data: {
    userinfo: {}
  },


  onLoad: function (options) {
    if (wx.getStorageSync('bmob')) {
      this.setData({
        userinfo: JSON.parse(wx.getStorageSync('bmob'))
      })
    }

  },

  onShow: function () {
   
    

  },
  listcheck: function () {
    // 查看使用记录
    wx.redirectTo({
      url: '../check/check',
    })
  },
  listaudit: function () {
    // 审核预订
    wx.redirectTo({
      url: '../audit/audit',
    })
  },
  listestimate: function () {
    // 评价用户使用
    wx.redirectTo({
      url: '../estimate/estimate',
    })
  },
  listmanageperinfo: function () {
    // 管理用户信息
    wx.redirectTo({
      url: '../manageperinfo/manageperinfo',
    })
  },
  exitlogin: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('username');
          //页面跳转
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },

  getScanning: function () {
    app.getScanning()
  }


})