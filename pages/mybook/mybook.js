const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userinfo: {},
    userid:null,

  },

  onLoad: function (options) {
    this.setData({
      userinfo: JSON.parse(wx.getStorageSync('bmob')),
      userid:JSON.parse(wx.getStorageSync('bmob')).objectId,

    })
    console.log(this.data.userid)
  },


})