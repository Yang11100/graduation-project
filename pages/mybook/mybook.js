const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userid: null, //当前登录用户的id，通过id来查询当前用户的预订信息
    allInfo: {}, //当前用户的所有信息
    successInfo: {}, //预订成功的资源信息（未使用或者正在使用）
    examiningInfo: {}, //正在审核的资源信息
    completedInfo: {}, //已经完成的资源信息（已经使用完成，审核未通过）
    time: null //时间
  },
  onLoad: function(options) {
    this.setData({
      userid: JSON.parse(wx.getStorageSync('bmob')).objectId
    })
    console.log(this.data.userid)
    //查询获得该用户的所以预订信息
    //results=0是表示未处理，1是预订成功，2是预订失败和3是使用结束
    //（都属于已完成的

    //未处理0，examiningInfo
    const query = Bmob.Query('booking')
    query.equalTo('userid', '==', this.data.userid)
    query.equalTo('results', '==', '0')
    query.find().then(res => {
      this.setData({
        examiningInfo: res
      })
      console.log('examining', this.data.examiningInfo)
    })
    //1
    const query1 = Bmob.Query('booking')
    query1.equalTo('userid', '==', this.data.userid)
    query1.equalTo('results', '==', '1')
    query1.find().then(res => {
      this.setData({
        successInfo: res
      })
      console.log('success', this.data.successInfo)
    })
    //2,3
    const query2 = Bmob.Query('booking')
    query2.equalTo('userid', '==', this.data.userid)
    const query3 = query2.equalTo('results', '==', '2')
    const query4 = query2.equalTo('results', '==', '3')
    query2.or(query3, query4)
    query2.find().then(res => {
      console.log(res)
      this.setData({
        completedInfo: res
      })
      console.log('complete', this.data.completedInfo)
    })
  }
})
