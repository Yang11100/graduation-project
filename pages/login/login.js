// pages/login/login.js
var app = getApp() //获得app.js里面的信息
var Bmob = require('../../utils/bmob.js')
Page({
  data: {
    username: null, //登录名数据
    password: null, //密码数据（变量）

    options: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    identity: ['管理员', '普通用户'], //下拉列表的数据
    first: 0, //选择的下拉列表下标

    verificationCode: '获取验证码', //验证码变量
    inputVerificationCode: null,//输入的验证码值

    emptyvalue:null,//清空输入
  },

  //下拉框
  bindPickeridentity: function (e) {
    // 身份
    this.setData({
      first: e.detail.value
    });
    console.log(e.detail.value)
  },
  //下拉框

  onLoad: function (options) {},

  clearbtnclick:function(){
    //清空信息事件
    this.setData({
      emptyvalue:'',
    })

  },

  loginbtnclick: function () {
    //登录事件
    if (this.data.inputVerificationCode.toLowerCase() == this.data.verificationCode.toLowerCase()) {

      Bmob.User.login(String(this.data.username), String(this.data.password)).then(res => {
        if (res.sessionToken) {
          wx.setStorageSync('role', this.data.first)
            wx.switchTab({
              url: '../personal/personal'
            })
        } else {
          wx.showToast({
            title: '用户名或者验证码不正确！',
            icon: 'none',
            duration: 1000 //持续的时间
          })
        }
      }).catch(err => {
        wx.showToast({
          title: '用户名或者验证码不正确！',
          icon: 'none',
          duration: 1000 //持续的时间
        })
      });

      // if (this.data.first == 1) {
      //   wx.switchTab({
      //     url: '../personal/personal'
      //   })
      // } else {
      //   wx.redirectTo({
      //     url: '../admin/admin'
      //   })
      // }
    }

    // else if (this.data.inputVerificationCode == null) {
    //验证码为空
    //   wx.showToast({
    //     title: '验证码为空',
    //     icon: 'none',
    //     duration: 1000 //持续的时间
    //   })
    // } 
    else {
      //弹出验证码不正确
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 1000 //持续的时间
      })
    }
  },
  usernameinput: function (e) {
    //获得登录名输入框中的数据
    this.setData({
      username: e.detail.value
    })
  },
  passwordinput: function (e) {
    //获得密码输入框中的数据
    this.setData({
      password: e.detail.value
    })
    console.log(e)
  },

  // 获得随机验证码
  getcode: function () {
    this.createCode()
  },
  createCode() {
    var verificationCode
    //首先默认abc为空字符串
    verificationCode = ''
    //设置长度，这里看需求，这里设置的是4位
    var codeLength = 4
    //设置随机字符
    var random = new Array(
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    )
    //循环codeLength 设置的4就循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围为0 ~ 36
      var index = Math.floor(Math.random() * 36)
      //字符串拼接每次随机的字符进行一次拼接
      verificationCode += random[index]
    }
    //将拼好的字符串赋值给abc
    this.setData({
      verificationCode: verificationCode
    })
    //console.log(verificationCode)
  },
  codeinput: function (e) {
    //获得验证码框的值，判断验证码是否正确
    this.setData({
      inputVerificationCode: e.detail.value
    })

  }
  // 获得随机验证码
})