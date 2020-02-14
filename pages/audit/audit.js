const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    allInfo: {}, //整条数据

  },

  onLoad: function (options) {
    console.log(options.resourceId)
    const query = Bmob.Query('booking');
    query.get(options.resourceId).then(res => {
      console.log(res)
      this.setData({
        allInfo: res,
      })
    }).catch(err => {
      console.log(err)
    })
    console.log(this.data.allInfo)


  },


})