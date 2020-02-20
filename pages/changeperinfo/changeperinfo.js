const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    objectId: null, //用户ID
    username: null, //当前用户的用户名
    Nickname: null, //昵称
    mark: null, //积分
    isChangeNickName: false,
    changeNickName: null //修改后的用户名
  },

  onLoad: function(options) {
    this.setData({
      objectId: JSON.parse(wx.getStorageSync('bmob')).objectId,
      username: JSON.parse(wx.getStorageSync('bmob')).username,
      Nickname: JSON.parse(wx.getStorageSync('bmob')).Nickname,
      mark: JSON.parse(wx.getStorageSync('bmob')).mark
    })
    console.log('Id', this.data.objectId)
  },
  NicknameInput: function(e) {
    this.setData({
      changeNickName: e.detail.value
    })
    console.log(e)
  },
  // 修改昵称
  $onChangeNickName() {
    this.setData({
      isChangeNickName: !this.data.isChangeNickName
    })
  }
})
