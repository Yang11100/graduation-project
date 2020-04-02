const app = getApp()
const util = require('../../utils/util.js')
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    startDate: util.formatTime(new Date(new Date().setHours(24))), // 最早时间
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
    first: 0, //资源类型
    time: 0, //时间段id
    id: null, //资源id
    specificroom: null, //选定的具体资源的信息
    number: null, //容纳人数
    equipment: null,
    roomList: [], // 未被占用的房间
    userid: null, //当前用户的id
    name: null, //选择的资源的名字
    mark: null, //用户的积分
    username: null, //用户名称

    identity: null, //角色

    location: 0, //滚动条的位置


  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      first: options.first,
      date: util.formatTime(new Date(new Date().setHours(24))),
      identity: JSON.parse(wx.getStorageSync('bmob')).identity,
      userid: JSON.parse(wx.getStorageSync('bmob')).objectId,
      mark: JSON.parse(wx.getStorageSync('bmob')).mark,
      username: JSON.parse(wx.getStorageSync('bmob')).Nickname,
      //设置不能选择当前日期以前的日期 minData:new Date()
    })
    this.searchClassRoom()
  },

  onShow() {
    this.setData({
      time: 0,
    })
    if (!this.data.first) {
      this.setData({
        first: 0,
      })
    }
    this.searchClassRoom()
  },
  // 日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    this.searchClassRoom()
  },
  bindPickerOrder: function (e) {
    // 时间(几点几点)
    this.setData({
      time: e.detail.value
    })
    this.searchClassRoom()
  },
  bindPickertype: function (e) {
    // 类型
    this.setData({
      first: e.detail.value
    })
    this.searchClassRoom()
  },
  // 查询教室
  searchClassRoom() {
    //查询莫个类型所有的数据
    console.log('time', this.data.time)
    console.log('data', this.data.date)
    console.log('first', this.data.first)
    this.setData({
      specificroom: null
    })
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
                if (element.objectId === el.resourceid && el.results !== 2) {
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
      })
    })
  },
  //通过点击资源名字来显示资源的具体信息
  nametap(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
      location: 5000
    })
    console.log(this.data.id)
    const query = Bmob.Query("room");
    query.equalTo("objectId", "==", this.data.id);
    query.find().then(res => {
      this.setData({
        specificroom: res,
        name: res[0].name
      })
      console.log(this.data.name)
    });
    console.log('specific', this.data.specificroom)

  },
  bookingbtn: function () {
    if (!wx.getStorageSync('bmob')) {
      wx.showModal({
        title: '提交失败',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    } else {
      console.log(this.data.mark)
      if (this.data.mark < 95) {
        wx.showModal({
          title: '提交失败',
          content: '您当前的积分小于95分不能提交申请',
        })
      } else if (this.data.identity === '0') {
        wx.showModal({
          title: '提交失败',
          content: '不能使用管理员账号申请',
        })
      } else {
        if (this.data.specificroom != null && this.data.time != 0) {
          wx.showModal({
            title: '提示',
            content: '确认申请预订',
            success: (res) => {
              if (res.confirm) { //这里是点击了确定以后
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                })
                const query = Bmob.Query('booking');
                query.set("userid", this.data.userid)
                query.set("username", this.data.username)
                query.set("resourceid", this.data.id)
                query.set("name", this.data.name)
                query.set("time", this.data.time)
                query.set("date", this.data.date)
                query.set("results", "0")
                query.save().then(res => {
                  console.log(res)
                }).catch(err => {
                  console.log(err)
                })
                wx.navigateTo({
                  url: '../mybook/mybook'
                })
              } else { //这里是点击了取消以后
                console.log('用户点击取消')
              }
            },
          })
        } else {
          wx.showModal({
            title: '提交失败',
            content: '请选择具体内容',
          })
        }
      }
    }
  },

  getScanning: function () {
    app.getScanning()
  }
})