const app = getApp()
const Bmob = require('../../utils/bmob.js')
const computedBehavior = require('miniprogram-computed')
Page({
  data: {
    userid: null, //当前登录用户的id，通过id来查询当前用户的预订信息
    allInfo: {}, //当前用户的所有信息
    successInfo: {}, //预订成功的资源信息（未使用或者正在使用）
    examiningInfo: {}, //正在审核的资源信息
    completedInfo: {}, //已经完成的资源信息（已经使用完成，审核未通过）
    time: null, //时间

  },
  // computed: {
  //   analysisTime(data) {
  //     return function (time) {
  //       console.log('time',time)
  //       let value
  //       switch (time) {
  //         case '1':
  //           value = '08:30-10:00'
  //           break
  //         case '2':
  //           value = '10:00-12:00'
  //           break
  //         case '3':
  //           value = '14:30-16:00'
  //           break
  //         case '4':
  //           value = '16:00-18:00'
  //       }
  //     }
  //   }

  // },

  onLoad: function (options) {
    this.setData({
      userid: JSON.parse(wx.getStorageSync('bmob')).objectId,
    })
    console.log(this.data.userid)
    //查询获得该用户的所以预订信息
    //results=0是表示未处理，1是预订成功，2是预订失败和3是使用结束
    //（都属于已完成的

    //未处理0，examiningInfo
    const query = Bmob.Query('booking');
    query.equalTo("userid", "==", this.data.userid);
    query.equalTo("results", "==", "0");
    query.find().then(res => {
      this.setData({
        examiningInfo: res
      })
      console.log('examining', this.data.examiningInfo)
    });
    //1
    const query1 = Bmob.Query('booking');
    query1.equalTo("userid", "==", this.data.userid);
    query1.equalTo("results", "==", "1");
    query1.find().then(res => {
      this.setData({
        successInfo: res
      })
      console.log('success', this.data.successInfo)
    });
    //2,3
    const query2 = Bmob.Query('booking');
    query2.equalTo("userid", "==", this.data.userid);
    const query3 = query2.equalTo("results", "==", "2");
    const query4 = query2.equalTo("results", "==", "3");
    query2.or(query3, query4);
    query2.find().then(res => {
      console.log(res)
      this.setData({
        completedInfo: res
      })
      console.log('complete', this.data.completedInfo)
    });

  },


})