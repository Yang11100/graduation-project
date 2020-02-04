const app = getApp()
const util = require('../../utils/util.js')
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    startDate: util.formatTime(new Date()), // 最早时间
    options: false,
    daytime: [
      '请选择',
      '08:30-10:00', //1
      '10:00-12:00', //2
      '14:30-16:00', //3
      '16:00-18:00' //4
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
    ], // '1多媒体教室', '2机房', '3学生工作室', '4会议室', '5琴房', '6实验室', '7舞蹈室'
    first: 0,
    time: 0,
    id: null,
    userChosen: '',
    roominfo: {},
    number: null, //容纳人数
    roomList: [] // 未被占用的房间
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
  // 日期
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    this.searchClassRoom()
  },
  bindPickerOrder: function(e) {
    // 时间(几点几点)
    this.setData({
      time: e.detail.value
    })
    this.searchClassRoom()
  },
  bindPickertype: function(e) {
    // 类型
    this.setData({
      first: e.detail.value
    })
    this.searchClassRoom()
  },
  // 查询教室
  searchClassRoom() {
    //查询莫个类型所有的数据
    const query = Bmob.Query('room')
    query.equalTo('type', '==', this.data.first)
    query.find().then(res => {
      console.log('res', res)
      //查询booking里面占用的数据
      const query1 = Bmob.Query('booking')
      query1.equalTo('time', '==', this.data.time)
      query1.equalTo('date', '==', this.data.date)
      query1.find().then(rep => {
        console.log('查询成功', rep)
        this.setData({
          roomList: []
        })
        if (res.length) {
          if (rep.length) {
            res.forEach(element => {
              let active = false
              rep.forEach(el => {
                if (element.objectId === el.id) {
                  active = true
                }
              })
              if (!active) {
                this.data.roomList.push(element)
              }
            })
            this.setData({
              roomList: this.data.roomList
            })
          } else {
            this.setData({
              roomList: res
            })
          }
        } else {
          wx.showToast({
            title: '暂无数据',
            icon: 'none'
          })
        }
        console.log('roomList', this.data.roomList)
        this.setData({
          roominfo: rep,
          number: rep.number,
          id: rep.id
        })
        console.log(this.data.id)
        console.log(this.data.number)
        //console.log(this.data.roominfo)
      })
    })
  },
  bookingbtn: function() {
    wx.navigateTo({
      url: '../mybook/mybook'
    })
  },

  getScanning: function() {
    app.getScanning()
  }
})
