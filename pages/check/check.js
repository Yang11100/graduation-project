const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    isUntreated: false, // 是否显示未处理
    isNoteValuatedInfo: false, // 是否显示待评价
    isAllInfo: false, //是否显示全部的使用记录
    untreated: {}, //未处理 0
    noteValuatedInfo: {}, //未评价的申请的信息 3
    allInfo: null, //所有申请的数据 0-1-2-3-4

  },

  onLoad: function (options) {
    this.refresh()
  },

  onShow() {
    this.onLoad()
  },
  auditTap(e) {
    let resourceId = e.currentTarget.dataset.id
    let jump = e.currentTarget.dataset.jump
    console.log(resourceId)
    wx.redirectTo({
      url: `../audit/audit?resourceId=${resourceId}&jump=${jump}`,
    })
  },
  estimateTap(e) {
    let resourceId = e.currentTarget.dataset.id
    let jump = e.currentTarget.dataset.jump
    wx.redirectTo({
      url: `../estimate/estimate?resourceId=${resourceId}&jump=${jump}`,
    })
  },
  // 展示隐藏
  $onClickIsShow(type) {
    let types = type.target.dataset.type
    this.setData({
      [types]: !this.data[types]
    })
  },
  refresh() {
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

})