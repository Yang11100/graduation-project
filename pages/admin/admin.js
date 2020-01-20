// pages/admin/admin.js
Page({
  data: {
    username: null,
  },


  onLoad: function (options) {

  },

  onShow: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.length !== 0) {
      this.setData({
        operation: '退出',
        login: true,
        userName: userInfo.userName,
        userPhone: userInfo.userPhone,
        userHead: '../../images/userhead.jpg'
      })
    } else {
      this.setData({
        userName: '',
        userPhone: '',
        userHead: '../../images/unuserhead.jpg',
        operation: '登录',
        login: false
      })
    }

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
  getScanning: function () {
    app.getScanning()
  }


})