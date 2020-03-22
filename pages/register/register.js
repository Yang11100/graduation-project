const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    username: null,
    password: null,
    ensurePassword: null,
    email: null,
    phone: null,
    options: ['管理员', '普通用户'],
    identity: '0',
    Nickname: null,

    usernameInfo: {}, //所有用户名
    verify:0,//验证用户名是否相同
    emptyvalue: null //清空输入
  },

  onLoad: function (options) {
    const query = Bmob.Query("_User");
    // 只返回select的字段值
    query.select("username");
    query.find().then(res => {
      // 返回成功
      this.setData({
        usernameInfo: res.map(o => o.username)
      })
      console.log(this.data.usernameInfo)
    })
  },

  //输入框用户名获取
  usernameInput(e) {
    this.setData({
      username: e.detail.value
    })
    console.log(e.detail.value)

  },
  //点击密码输入框
  search() {
    for (var i = 0; i < this.data.usernameInfo.length; i++) {
      if (this.data.username === this.data.usernameInfo[i]) {
        wx.showToast({
          title: '用户名已存在',
          icon: 'none',
          duration: 1000
        })
        this.setData({
          verify:1
        })
      }
    }
  },
  //获得密码输入框中的数据
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    console.log(e.detail.value)
  },
  ensurePasswordInput(e) {
    this.setData({
      ensurePassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  //验证密码是否一致
  ensurePwd() {
    if (this.data.password != this.data.ensurePassword) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 1000,
      })
    }
  },
  //输入框phone获取
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
    console.log(e.detail.value)
  },
  //身份picker
  bindPickerIdentity: function (e) {
    this.setData({
      identity: e.detail.value
    })
    console.log(e.detail.value)
  },
  //输入框昵称获取
  NicknameInput(e) {
    this.setData({
      Nickname: e.detail.value
    })
    console.log(e.detail.value)
  },


  //提交注册
  submitRegister() {
    let _this = this
    console.log('username', _this.data.username)
    if (_this.data.username === null) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (_this.data.password === null) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (_this.data.username === null && _this.data.password === null) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (_this.data.verify === 1) {
      wx.showToast({
        title: '用户名已存在',
        icon: 'none',
        duration: 1000
      })
    } else if (_this.data.password != _this.data.ensurePassword) {
      wx.showToast({
        title: '密码不一致',
        icon: 'none',
        duration: 1000,
      })
    } else {
      wx.showModal({
        title: '确定提交',
        success: function (res) {
          if (res.confirm) {
            //注册
            let params = {
              username: _this.data.username,
              password: _this.data.password,
              // email: _this.data.email,
              phone: _this.data.phone,
              identity: _this.data.identity,
              mark: '100',
              Nickname: _this.data.Nickname,
            }
            Bmob.User.register(params).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            });
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function () {
              //要延时执行的代码
            }, 1100) //延迟时间 这里是1秒
            wx.showModal({
              title: '继续注册',
              success: function (res) {
                if (res.confirm) {
                  //清空信息事件
                  _this.setData({
                    emptyvalue: ''
                  })
                } else { //这里是点击了取消以后
                  wx.navigateTo({
                    url: '../personal/personal',
                  })
                }
              }
            })
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  clearbtnclick: function () {
    //清空信息事件
    this.setData({
      emptyvalue: ''
    })
  },


})