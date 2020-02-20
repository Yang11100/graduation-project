const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    resourceId: null, //当前的id
    userId: null, //申请用户的Id
    currentInfo: {},

  },


  onLoad: function (options) {
    this.setData({
      resourceId: options.resourceId,
    })
    this.refreshData()
    console.log('userId', this.data.userId)
  },

  refreshData() {
    const query = Bmob.Query('booking');
    query.equalTo("objectId", "==", this.data.resourceId);
    query.find().then(res => {
      console.log('booking', res)
      this.setData({
        currentInfo: res,
        userId: res[0].userid,
      })
    });
    // console.log('current', this.data.currentInfo)
    console.log('userId', this.data.userId)
    const query1 = Bmob.Query("_User");
    query1.equalTo("objectId", "==", this.data.userId);
    query1.find().then(res => {
      console.log('user',res)
    });
  },
  addMarkTap() {

  },
  notChangeTap() {

  },
  reduceMarkTap() {

  },



})