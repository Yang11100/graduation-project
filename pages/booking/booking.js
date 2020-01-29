const app = getApp()
const util = require('../../utils/util.js')
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    options: false,
    daytime: [
      '08：30-10：00',
      '10：00-12：00',
      '08：30-12：00',
      '14：30-16：00',
      '16:00-18:00',
      '14:30-18:00'
    ],
    type: [
      '多媒体教室',
      '机房',
      '学生工作室',
      '会议室',
      '琴房',
      '运动馆',
      '舞蹈室'
    ], // '0多媒体教室', '1机房', '2学生工作室', '3会议室', '4琴房', '5运动馆', '6舞蹈室'
    first: 0,
    userChosen: ''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    //   projecturl: options.projecturl
    // })
    // console.log(first)
    //点开自动获取当前日期
    this.setData({
      region: options.type,
      date: util.formatTime(new Date())
      //设置不能选择当前日期以前的日期 minData:new Date()
    })
  },

  bindDateChange: function(e) {
    // 日期
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerOrder: function(e) {
    // 时间
    this.setData({
      first: e.detail.value
    })
    console.log(e.detail.value)
  },
  bindPickertype: function(e) {
    // ###################
    const query = Bmob.Query('room')
    const query1 = query.equalTo('type', '==', '0')
    const query2 = query.equalTo('active', '==', '0')
    query.and(query1, query2)
    query.find().then(res => {
      console.log('查询成功', res)
    })
    // ##################
    // 类型
    this.setData({
      first: e.detail.value
    })
    console.log(e.detail.value)
  },

  getScanning: function() {
    app.getScanning()
  }
})
