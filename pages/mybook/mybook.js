const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userid: null, //当前登录用户的id，通过id来查询当前用户的预订信息
    allInfo: {}, //当前用户的所有信息
    successInfo: {}, //预订成功的资源信息（未使用或者正在使用）
    examiningInfo: {}, //正在审核的资源信息
    failInfo: {}, //用户自己退订的和管理员审核未通过的
    completedInfo: {}, //已经完成的资源信息（已经使用完成）

    time: null, //时间

    isSuccessInfo: true, //是否显示预订成功
    isExaminingInfo: true, //是否显示正在审核
    isFailInfo: true, //是否显示预订成功
    isCompletedInfo: true, //是否显示预订成功

  },
  onLoad: function (options) {
    this.setData({
      userid: JSON.parse(wx.getStorageSync('bmob')).objectId
    })
    console.log(this.data.userid)
    //查询获得该用户的所以预订信息
    //results=0是表示未处理，1是预订成功，2是预订失败和3是使用结束
    //（都属于已完成的

    //调用获得数据的函数
    this.refreshData()
  },


  cancelTap(e) {
    console.log(e.currentTarget.dataset.id)
    let _this = this
    wx.showModal({
      title: '确定退订',
      content: '是否确定取消预订',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('booking');
          query.get(e.currentTarget.dataset.id).then(res => {
            console.log(res)
            res.set('results', '2')
            res.save()
            //调用获得数据的函数，重新获得数据、刷新
            _this.refreshData()
          }).catch(err => {
            console.log(err)
          })
          wx.showToast({
            title: '退订成功',
            icon: 'success',
            duration: 2000
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },

  // 展示隐藏
  $onClickIsShow(type) {
    let types = type.target.dataset.type
    this.setData({
      [types]: !this.data[types]
    })
  },

  //刷新删除的数据
  refreshData() {
    //未处理0，examiningInfo
    const query = Bmob.Query('booking')
    query.equalTo("userid", "==", this.data.userid)
    query.equalTo("results", "==", "0")
    query.find().then(res => {
      this.setData({
        examiningInfo: res
      })
      console.log('examining', this.data.examiningInfo)
    })
    //1,预订成功success
    const query1 = Bmob.Query('booking')
    query1.equalTo('userid', '==', this.data.userid)
    query1.equalTo('results', '==', '1')
    query1.find().then(res => {
      this.setData({
        successInfo: res
      })
      console.log('success', this.data.successInfo)
    })
    //2,已退订，未通过，fail
    const query2 = Bmob.Query('booking')
    query2.equalTo('userid', '==', this.data.userid)
    query2.equalTo('results', '==', '2')
    query2.find().then(res => {
      console.log(res)
      this.setData({
        failInfo: res
      })
      console.log('fail', this.data.failInfo)
    })
    //3，使用完成，complete
    const query3 = Bmob.Query('booking')
    query3.equalTo('userid', '==', this.data.userid)
    const query4 = query3.equalTo('results', '==', '3')
    const query5 = query3.equalTo('results', '==', '4')
    query3.or(query4, query5);
    query3.find().then(res => {
      console.log(res)
      this.setData({
        completedInfo: res
      })
      console.log('complete', this.data.completedInfo)
    })

  },

})