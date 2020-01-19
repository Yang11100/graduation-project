// pages/login/login.js
var app = getApp() //获得app.js里面的信息
Page({
  data: {
    username: null, //登录名数据
    password: null, //密码数据（变量）

    how: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['管理员', '普通用户'], //下拉列表的数据
    index: 0, //选择的下拉列表下标

    verificationCode: '获取验证码', //验证码变量
    inputVerificationCode: null //输入的验证码值
  },

  //下拉框
  selectTap() {
    this.setData({
      show: !this.data.show
    })
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index //获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    })
  },
  //下拉框

  onLoad: function(options) {},

  loginbtnclick: function() {
    //登录事件
    //这里还需要用户名和密码提交验证的过程
    app.userData.username = this.data.username
    app.userData.password = this.data.password
    // wx.switchTab({
    //   url: '../mine/mine',
    // })
    if (this.data.inputVerificationCode.toLowerCase() == this.data.verificationCode.toLowerCase()) {
      wx.switchTab({
        url: '../personal/personal'
      })
    } else {
      //弹出验证码不正确
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 1000 //持续的时间
      })
    }
  },
  usernameinput: function(e) {
    //获得登录名输入框中的数据
    this.setData({
      username: e.detail.value
    })
  },
  passwordinput: function(e) {
    //获得密码输入框中的数据
    this.setData({
      password: e.detail.value
    })
  },

  // 获得随机验证码
  getcode: function() {
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
    // console.log(verificationCode)
  },
  codeinput: function(e) {
    //获得验证码框的值，判断验证码是否正确
    this.setData({
      inputVerificationCode: e.detail.value
    })
  }
  // 获得随机验证码
})
