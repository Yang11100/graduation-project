let app = getApp()
let Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userinfo: {},
    role: 0,
    identity: null
  },
  onLoad: function (options) {
    if (wx.getStorageSync('role')) {
      this.setData({
        role: wx.getStorageSync('role'),
        identity: '普通用户'
      })
    } else {
      this.setData({
        identity: '管理员'
      })
    }
    console.log(wx.getStorageSync('role'))

    if (wx.getStorageSync('bmob')) {
      this.setData({
        userinfo: JSON.parse(wx.getStorageSync('bmob'))
      })

    }
    console.log(this.data.userinfo)
    if (!this.data.userinfo.sessionToken) {
      console.log('cc')
      wx.redirectTo({
        url: '../login/login'
      })
    }
  },
  // 页面初始化 options为页面跳转所带来的参数

  onShow: function () {
    // 页面显示.
  },

  //普通用户
  listmybook: function () {
    // 我的预订
    wx.navigateTo({
      url: '../mybook/mybook'
    })
  },
  listchangeperinfo: function () {
    // 修改个人信息
    wx.navigateTo({
      url: '../changeperinfo/changeperinfo'
    })
  },

  //管理员
  listcheck: function () {
    //查看用户使用记录
    wx.navigateTo({
      url: '../check/check'
    })
  },
  listaudit: function () {
    //审核用户预订
    wx.navigateTo({
      url: '../audit/audit',
    })
  },
  listestimate: function () {
    //评价用户使用
    wx.navigateTo({
      url: '../estimate/estimate',
    })
  },
  listmanageperinfo: function() {
    //管理用户信息
    wx.navigateTo({
      url: '../manageperinfo/manageperinfo',
    })
  },
  exitlogin: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定'),清空缓存
          wx.removeStorageSync('bmob')
          wx.removeStorageSync('role')
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

  getScanning: function () {
    app.getScanning()
  }
})