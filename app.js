//app.js
var Bmob = require('./utils/bmob.js');
Bmob.initialize('0d3f73b2628f528b', 'pw1211','c4e5b158b9fc5af0204fd6eac5f3109a')

App({
  onLaunch: function () {
    // 展示本地存储能力


  },


  userData: {
    //登录信息
    username: null,
    password: null
  }
})