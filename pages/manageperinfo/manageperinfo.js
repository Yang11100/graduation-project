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
  //删除用户
  deleteUserTap() {
    let _this = this
    wx.showModal({
      title: '删除当前用户',
      content: '是否确定',
      success: function (res) {
        if (res.confirm) {
          const query = Bmob.Query('_User');
          query.destroy(e.currentTarget.dataset.id).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },


})