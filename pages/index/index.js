//index.js
//获取应用实例
Page({
  data: {
   username:'毕竟我那么帅',
   userInfo:{},
    isShow:true
  },
  clickHandle(){
    wx.switchTab({
      url: '/pages/list/list'
    })
  },
  onLoad: function (options) {
    console.log(this)
    this.TogetUserInfo();
  },
  TogetUserInfo(){
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            isShow: false
          });
        } else {
          this.setData({
            isShow: true
          });
        }
      }
    })
    wx.getUserInfo({
      success: (data) => {
        //拿到data后更新data中的userinfo
        this.setData({
          userInfo: data.userInfo
        });
      },
      fail: (data) => {
        console.log("获取用户信息失败");
      }
    })
  },
  HaneddsdfdUserInfo(data) {
    if (data.detail.rowData) {
      this.TogetUserInfo();
    }
  }
})
