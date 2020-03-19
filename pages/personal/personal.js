let app = getApp()
let Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userinfo: {},
    role: null,
    identityname: null,
    Nickname: null
  },
  onLoad: function (options) {
    if (wx.getStorageSync('bmob')) {
      this.setData({
        userinfo: JSON.parse(wx.getStorageSync('bmob')),
        role: JSON.parse(wx.getStorageSync('bmob')).identity
      })
     // console.log(this.data.role)
      if (this.data.role==1) {
        this.setData({
          role: this.data.role,
          identityname: '普通用户'
        })
      } else {
        this.setData({
          role: 0,
          identityname: '管理员'
        })
      }
    }
    if (!this.data.userinfo.sessionToken) {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },

  onShow(){
    this.setData({
      userinfo: JSON.parse(wx.getStorageSync('bmob')),
    })
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
  listmanageperinfo: function () {
    //管理用户信息
    wx.navigateTo({
      url: '../manageperinfo/manageperinfo',
    })
  },
  //注册新用户
  listregister(){
    wx.navigateTo({
      url: '../register/register',
    })

  },


  bookingbtn(){
    wx.navigateTo({
      url: '../booking/booking',
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