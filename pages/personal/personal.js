// pages/personal/personal.js
var app=getApp();
Page({
  data:{
    username:null,
  },
  onLoad:function(options){
    if(app.userData.username==null){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    else{
      this.setData({username:app.userData.username})
    }
    // 页面初始化 options为页面跳转所带来的参数
  },
  onShow:function(){
    // 页面显示.
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo.length !== 0){
      this.setData({
        operation: '退出',
        login: true,
        userName:userInfo.userName,
        userPhone:userInfo.userPhone,
        userHead: '../../images/userhead.jpg'
      })
    }else{
      this.setData({
        userName: '',
        userPhone: '',
        userHead: '../../images/unuserhead.jpg',
        operation:'登录',
        login: false
      })
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  defaultLogin:function(e){
    let login = e.currentTarget.dataset.login;
    if(login == true){
      // 点击退出
      wx.showToast({
        title: '退出中',
        icon: 'loading'
      })
      setTimeout(function(){
        wx.hideToast();
        wx.removeStorageSync('userInfo');
        wx.switchTab({
          url: '../index/index'
        })
      },2000);
    }else{
      // 点击登录
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  listFirst:function(){
    // 我的预订
    if(this.data.login){
     wx.redirectTo({
       url: '../reserve/reserve',
     })
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 800
      })
    }
  },
  getScanning: function () {
    app.getScanning()
  }
})