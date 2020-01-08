// test/code/code.js
Page({

  data: {
    abc: "获取验证码"
  },
  getcode: function () {
    this.createCode();
  },
  createCode() {
    var abc;
    //首先默认abc为空字符串
    abc = '';
    //设置长度，这里看需求，这里设置的是4位
    var codeLength = 4;
    //设置随机字符
    var random = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    //循环codeLength 设置的4就循环4次
    for (var i = 0; i < codeLength; i++) {
      //设置随机数范围为0 ~ 36
      var index = Math.floor(Math.random() * 36);
      //字符串拼接每次随机的字符进行一次拼接
      abc += random[index];
    }
    //将拼好的字符串赋值给abc
    this.setData({
      abc: abc
    })
  },

})