const app = getApp()
var util = require('../../utils/util.js')
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    currentInfo: {}, //当前的这条数据
    resourceId: null, //
  },

  onLoad: function (options) {
    this.setData({
      resourceId: options.resourceId,
    })
    this.refreshData()
  },

  agreeTap() {
    let _this = this
    wx.showModal({
      title: '同意',
      content: '是否确定',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('booking');
          query.get(_this.data.resourceId).then(res => {
            console.log(res)
            res.set('results', '1')
            res.save()
          }).catch(err => {
            console.log(err)
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../check/check',
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  disagreeTap() {
    let _this = this
    wx.showModal({
      title: '不同意',
      content: '是否确定',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('booking');
          query.get(_this.data.resourceId).then(res => {
            console.log(res)
            res.set('results', '2')
            res.save()
          }).catch(err => {
            console.log(err)
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '../check/check',
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  refreshData() {
    const query = Bmob.Query('booking');
    query.equalTo("objectId", "==", this.data.resourceId);
    query.equalTo("results", "==", "0");
    query.find().then(res => {
      // TODO:
      console.log('res', res.length)
      this.setData({
        currentInfo: res
      })
    });
    console.log('current', this.data.currentInfo)
  },
})