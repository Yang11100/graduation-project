// test/scroll/scroll.js
Page({

  data: {
    systemInfo:{},
    toView:'default',
  },
  onLoad: function (options) {
    var that=this
    wx.getSystemInfo({//获取屏幕高度
      success:function(res) {
        that.setData({
          systemInfo:res
        })
        // that.update()
      }
    })
  },
  click:function(e){
    var that=this;
    var hash=e.target.dataset.hash//获取wxml中data-hash传过来的参数
    this.setData({
      toView:hash
    })


  }


})