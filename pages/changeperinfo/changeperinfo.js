const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    objectId: null, //用户ID
    bookingObjectID: {}, //booking表里面的objectID
    username: null, //当前用户的用户名
    Nickname: null, //昵称
    mark: null, //积分

    isChangeNickName: false, //点击修改昵称时，弹出输入框
    isChangePassword: false, //点击修改密码时，弹出输入框

    changeNickName: null, //修改后的用户名
    oldPassword: null, //原密码
    firstPassword: null, //第一次输入密码
    checkPassword: null //验证密码
  },

  onLoad: function (options) {
    this.setData({
      objectId: JSON.parse(wx.getStorageSync('bmob')).objectId,
      username: JSON.parse(wx.getStorageSync('bmob')).username,
      Nickname: JSON.parse(wx.getStorageSync('bmob')).Nickname,
      mark: JSON.parse(wx.getStorageSync('bmob')).mark
    })
    console.log('_User表里面的objectId', this.data.objectId)
    //通过当前的_User表里面的objectID来查询booking表里面的userid从而获得booking里面的userid==当前userid的objectID
    const query = Bmob.Query('booking')
    query.equalTo('userid', '==', this.data.objectId)
    query.find().then(res => {
      console.log('userid的查询', res)
      this.setData({
        bookingObjectID: res
      })
      console.log('bookingObjectID', this.data.bookingObjectID)
    })
  },

  // 修改昵称弹出输入框
  $onChangeNickName() {
    this.setData({
      isChangeNickName: !this.data.isChangeNickName
    })
  },
  // 修改密码弹出输入框
  $onChangePassword() {
    this.setData({
      isChangePassword: !this.data.isChangePassword
    })
  },

  //获得昵称输入框的值
  NicknameInput: function (e) {
    this.setData({
      changeNickName: e.detail.value
    })
    console.log(this.data.changeNickName)
  },
  //获得旧密码输入框的值
  oldPasswordInput: function (e) {
    this.setData({
      oldPassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  //获得第一次密码输入框的值
  firstPasswordInput: function (e) {
    this.setData({
      firstPassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  //获得第二次密码输入框的值
  checkPasswordInput: function (e) {
    this.setData({
      checkPassword: e.detail.value
    })
    if (this.data.checkPassword !== this.data.firstPassword) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 700
      })
    }
    console.log(e.detail.value)
  },

  //提交昵称修改
  submitNicknameTap() {
    let _this = this
    if (_this.data.changeNickName === null) {
      wx.showToast({
        title: '内容为空',
        icon: 'none',
        duration: 600
      })
    } else {
      wx.showModal({
        title: '提交修改',
        content: '是否确定昵称',
        success: function (res) {
          if (res.confirm) {
            const query = Bmob.Query('_User')
            query.get(_this.data.objectId).then(res => {
                console.log(res)
                res.set('Nickname', _this.data.changeNickName)
                res.save()
              })
              .catch(err => {
                console.log(err)
              })
            //需根据objectId修改表中内容，所以这里应该先通过_User表里面的objectID==booking表里面的
            //userid,然后查询booking里面的objectID。还要修改缓存里面的数据
            const query1 = Bmob.Query('booking')
            let params = _this.data.bookingObjectID
            params.forEach(element => {
              query1.get(element.objectId).then(res => {
                console.log('booking表里面当前用户相关的数据展示', res)
                res.set('username', _this.data.changeNickName)
                res.save()
              }).catch(err => {
                console.log(err)
              })
            })
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1500
            })
            _this.setData({
              Nickname: _this.data.changeNickName,
              isChangeNickName: !_this.data.isChangeNickName
            })
          } else {
            //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  //提交密码修改
  submitPasswordTap() {
    let _this = this
    if (_this.data.oldPassword === null) {
      wx.showToast({
        title: '原密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (_this.data.firstPassword != _this.data.checkPassword) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 1000
      })
    } else {
      wx.showModal({
        title: '提交修改',
        content: '是否确定密码',
        success: function (res) {
          if (res.confirm) {
            let objectId = _this.data.objectId
            let data = {
              oldPassword: _this.data.oldPassword, //原密码
              newPassword: _this.data.firstPassword //修改后的密码
            }
            Bmob.updateUserPassword(objectId, data)
              .then(res => {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 1500
                })
                _this.setData({
                  isChangePassword: !_this.data.isChangePassword
                })
              })
              .catch(err => {
                wx.showToast({
                  title: '原密码输入错误',
                  icon: 'none',
                  duration: 1500
                })
              })
          } else {
            //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})