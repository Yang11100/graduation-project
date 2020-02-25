const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    userInfo: {}, //普通用火的信息

    //userID, //选择到的普通用户的ID

  },


  onLoad: function (options) {
    this.refresh()
  },

  //刷新数据
  refresh() {
    const query = Bmob.Query("_User");
    query.equalTo("identity", "==", "1");
    query.find().then(res => {
      this.setData({
        userInfo: res,
      })
    });
  },


  //重置密码
  resetPasswordTap(e) {
    const query = Bmob.Query('_User');
    query.set('id', e.currentTarget.dataset.id) //需要修改的objectId
    query.set('password', '123456')
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    console.log(e.currentTarget.dataset.id)
  },
  registerTap() {
    wx.navigateTo({
      url: '../register/register',
    })

  },


})