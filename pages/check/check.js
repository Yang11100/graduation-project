const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    isUntreated: true, // 是否显示未处理
    isNoteValuatedInfo: true, // 是否显示待评价
    untreated: {}, //未处理 0
    noteValuatedInfo: {}, //未评价的申请的信息 3
    allInfo: null, //所有申请的数据 0-1-2-3-4

    isExpanding: false
  },

  onLoad: function(options) {
    const query = Bmob.Query('booking')
    query.equalTo('results', '==', '0')
    query.find().then(res => {
      console.log(res)
      this.setData({
        untreated: res
      })
    })
    console.log('untreated', this.data.untreated)
    const query1 = Bmob.Query('booking')
    query1.equalTo('results', '==', '3')
    query1.find().then(res => {
      console.log(res)
      this.setData({
        noteValuatedInfo: res
      })
    })
    console.log('noteValuatedInfo', this.data.noteValuatedInfo)
    const query2 = Bmob.Query('booking')
    query2.find().then(res => {
      console.log(res)
      this.setData({
        allInfo: res
      })
    })
    console.log('allInfo', this.data.allInfo)
  },
  auditTap() {
    wx.navigateTo({
      url: '../audit/audit'
    })
  },
  estimateTap() {
    wx.navigateTo({
      url: '../estimate/estimate'
    })
  },
  // 展示隐藏
  $onClickIsShow(type) {
    let types = type.target.dataset.type
    this.setData({
      [types]: !this.data[types]
    })
  }
})
