const app = getApp()
const Bmob = require('../../utils/bmob.js')
Page({
  data: {
    resourceId: null, //当前的id
    userId: null, //申请用户的Id
    currentInfo: {},

    options:['+3','+2','+1','0','-1','-2','-3'],//选择增加减少的积分
    changeMark:'3',//选择的顺序

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
    query.equalTo('results', '==', '3')
    query.find().then(res => {
      console.log('booking', res)
      res.forEach(element => {
        element.mark = 0
      })
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
  markPicker: function (e) {
    this.data.currentInfo[e.target.dataset.index].mark = this.data.options[e.detail.value]
    this.setData({
      changeMark: e.detail.value,
      currentInfo: this.data.currentInfo
    })
    console.log(e.detail.value)
  },

  submitEstimate(){

  },



})