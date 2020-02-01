const app = getApp()
const util = require('../../utils/util.js')
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    options: false,
    daytime: [
      '请选择',
      '08:30-10:00', //1
      '10:00-12:00', //2
      '08:30-12:00', //3
      '14:30-16:00', //4
      '16:00-18:00', //5
      '14:30-18:00', //6
      '08:30-18:00',//7
    ],
    type: [
      '请选择',
      '多媒体教室',
      '机房',
      '学生工作室',
      '会议室',
      '琴房',
      '实验室',
      '舞蹈室'
    ], // '0多媒体教室', '1机房', '2学生工作室', '3会议室', '4琴房', '5实验室', '6舞蹈室'
    first: 0,
    seconds:0,
    userChosen: '',
    roominfo: {},
    number: null, //容纳人数
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    //   projecturl: options.projecturl
    // })
    // console.log(first)
    //点开自动获取当前日期
    this.setData({
      region: options.type,
      date: util.formatTime(new Date()),
      //设置不能选择当前日期以前的日期 minData:new Date()
    })
  },

  bindDateChange: function (e) {
    // 日期
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerOrder: function (e) {
    // 时间(几点几点
    this.setData({
      first: e.detail.value
    })
    console.log(this.data.first)
  },
  bindPickertype: function (e) {
    // 类型
    this.setData({
      first: e.detail.value+1
    })
    console.log(this.data.first)
    // ###################
    const query = Bmob.Query('room')
    const query1 = query.equalTo('type', '==', this.data.first)
    const query2 = query.equalTo('active', '==', '0')
    query.find().then(res => {
      console.log('查询成功', res)
      this.setData({
        roominfo: res
      })
      console.log(this.data.roominfo)
    })
    // ##################

  },
  bookingbtn: function () {
    wx.navigateTo({
      url: '../mybook/mybook',
    })
  },

  getScanning: function () {
    app.getScanning()
  }
})