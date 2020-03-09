const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    resourceId: null, //当前的id
    userId: null, //申请用户的Id
    currentInfo: {},

    options: ['+3', '+2', '+1', '0', '-1', '-2', '-3'], //选择增加减少的积分0=3,1=2,2=1,3=0,4=-1,5=-2,6=-3
    changeMark: '3', //选择的顺序
    userMark: null, //用户的积分
    changedMark: null //更改后的积分，录入进数据库
  },

  onLoad: function (options) {
    this.setData({
      resourceId: options.resourceId
    })
    this.refreshData()
  },

  refreshData() {
    const query = Bmob.Query('booking')
    query.equalTo('objectId', '==', this.data.resourceId)
    query.equalTo('results', '==', '3')
    query.find().then(res => {
      res.forEach(element => {
        element.mark = 0
      })
      this.setData({
        currentInfo: res,
        userId: res[0].userid
      })
      console.log('current', this.data.currentInfo)
      console.log('userId', this.data.userId)
    })
  },
  markPicker: function (e) {
    // TODO:
    this.data.currentInfo[e.target.dataset.index].mark = this.data.options[e.detail.value]
    this.setData({
      changeMark: this.data.options[e.detail.value],
      currentInfo: this.data.currentInfo
    })
    console.log('cuinfo', this.data.currentInfo)
    console.log('mark', this.data.changeMark)
  },

  submitEstimate(e) {
    let userId = e.currentTarget.dataset.id
    console.log(userId)
    const query = Bmob.Query('_User')
    query.equalTo('objectId', '==', userId)
    query.find().then(res => {
      this.setData({
        userMark: res[0].mark
      })
      this.markOperation()
    })
  },
  // 积分操作
  markOperation() {
    if (parseInt(this.data.userMark) === 100 && parseInt(this.data.changeMark) > 0 && parseInt(this.data.changeMark) < 4) {
      wx.showToast({
        title: '已是满分',
        icon: 'none',
        duration: 1000
      })
    } else if (parseInt(this.data.userMark) < 100 && (parseInt(this.data.changeMark)) < 0) {
      this.setData({
        changedMark: parseInt(this.data.userMark) - parseInt(this.data.changeMark)
      })
    }
    console.log('changedMark', this.data.changedMark)
  }
})