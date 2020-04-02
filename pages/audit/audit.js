const app = getApp()
var util = require('../../utils/util.js')
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    currentInfo: {}, //当前的这条数据
    resourceId: null, //从记录表传来的id
    jump: false, // 默认不跳转
    backgroundImage: '/images/audit1.jpeg'
  },

  onLoad: function (options) {
    this.setData({
      resourceId: options.resourceId,
      jump: options.jump ? options.jump : false
    })
    console.log(this.data.resourceId)
    this.refreshData()
  },

  agreeTap(e) {
    let id = e.currentTarget.dataset.id
    let _this = this
    wx.showModal({
      title: '同意',
      content: '是否确定',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('booking')
          query.get(id).then(res => {
            res.set('results', '1')
            res.save()
            _this.refreshDataTwo()
          }).catch(err => {
            console.log(err)
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          if (_this.data.jump) {
            wx.redirectTo({
              url: '../check/check'
            })
          }
        } else {
          //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  disagreeTap(e) {
    let id = e.currentTarget.dataset.id
    let _this = this
    wx.showModal({
      title: '不同意',
      content: '是否确定',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('booking')
          query.get(id).then(res => {
              console.log(res)
              res.set('results', '2')
              res.save()
              _this.refreshDataTwo()
            })
            .catch(err => {
              console.log(err)
            })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          console.log(_this.data.jump);
          if (_this.data.jump) {
            wx.redirectTo({
              url: '../check/check'
            })
          }
        } else {
          //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  refreshData() {
    console.log('success login');
    const query = Bmob.Query('booking')
    query.equalTo('objectId', '==', this.data.resourceId)
    query.equalTo('results', '==', '0')
    query.find().then(res => {
      // TODO:
      console.log('res.', res.length)
      if (res.length === 0) {
        console.log('success')
        this.setData({
          backgroundImage: '/images/none.png'
        })
      }
      this.setData({
        currentInfo: res
      })
    })
    console.log('current', this.data.currentInfo)
  },

  //刷新
  refreshDataTwo(){
    console.log('success login 2');
    const query = Bmob.Query('booking')
    query.equalTo('results', '==', '0')
    query.find().then(res => {
      // TODO:
      console.log('res.', res.length)
      if (res.length === 0) {
        console.log('success')
        this.setData({
          backgroundImage: '/images/none.png'
        })
      }
      this.setData({
        currentInfo: res
      })
    })
    console.log('current', this.data.currentInfo)
  }
})