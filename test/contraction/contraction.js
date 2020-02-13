// test/contraction/contraction.js
Page({

  data: {
    isExpanding: false,
  },

  handleExpandingChange: function () {
    this.setData({
      isExpanding: !this.data.isExpanding
    })
  },

  onLoad: function (options) {

  },


})