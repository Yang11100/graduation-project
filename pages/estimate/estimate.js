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
    changedMark: null,//更改后的积分，录入进数据库

    backgroundImage: '/images/audit1.jpeg'
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
      if (res.length === 0) {
        console.log('success')
        this.setData({
          backgroundImage: '/images/none.png'
        })
      }
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
    console.log('e', e);
    this.setData({
      userId: e.currentTarget.dataset.id,
      resourceId: e.currentTarget.dataset.id1
    })
    console.log('userId', this.data.userId)
    console.log('resourceId1', this.data.resourceId);
    const query = Bmob.Query('_User')
    query.equalTo('objectId', '==', this.data.userId)
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
      this.setData({
        changedMark:100
      })
    } else if (parseInt(this.data.userMark) <= 100 && (parseInt(this.data.changeMark)) < 0) {
      this.setData({
        changedMark: parseInt(this.data.userMark) + parseInt(this.data.changeMark)
      })
    } else if (parseInt(this.data.userMark) <= 100 && (parseInt(this.data.changeMark)) > 0) {
      if ((parseInt(this.data.userMark) + parseInt(this.data.changeMark)) >= 100) {
        this.setData({
          changedMark: 100
        })
      } else {
        changedMark: parseInt(this.data.userMark) + parseInt(this.data.changeMark)
      }
    }
    console.log('changedMark', this.data.changedMark.toString());
    const query = Bmob.Query('_User');
    query.get(this.data.userId).then(res => {
      console.log(res)
      res.set('mark', this.data.changedMark.toString())
      res.save()
    }).catch(err => {
      console.log(err)
    })
    const query1 = Bmob.Query('booking');
    query1.get(this.data.resourceId).then(res => {
      console.log(res)
      res.set('results', '4')
      res.save()
    }).catch(err => {
      console.log(err)
    })
    this.refreshData()
  }
})