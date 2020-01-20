// pages/booking/booking.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data:{

    options: false,
    daytime:['08：30-10：00','10：00-12：00', '08：30-12：00','14：30-16：00','16:00-18:00','14:30-18:00'],
    type:['多媒体教室','机房','学生工作室','会议室','琴房','运动馆','舞蹈室'],
    first: 0,
    userChosen: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    //点开自动获取当前日期
    this.setData({
      region: options.type,
      date:util.formatTime(new Date),
     //设置不能选择当前日期以前的日期 minData:new Date()
    })
  },

  bindDateChange: function(e) {
    // 日期
    this.setData({
      date: e.detail.value
    });
  },
  bindPickerOrder: function(e) {
    // 时间
    this.setData({
      first: e.detail.value
    });
  },
  bindPickertype: function(e) {
    // 时间
    this.setData({
      first: e.detail.value
    });
  },

  getScanning: function () {
    app.getScanning()
  },
})