// pages/detail/detail.js
let datas=require('../../datas/list-data.js')
let appdata=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  detailObject:{},
  index:null,
  isCollection:false,
  isMusicPlay :false
  },
  //点击分享按钮事件
  shareHandler(){
   wx.showActionSheet({
     itemList: [
       '分享到朋友圈','分享到qq空间','分享到微博','分享到好友','分享到qq好友'
     ],
   })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let index=options.index;
      this.setData({
        detailObject:datas.list_data[index],
        index
      });

      //放在onload里是为了能够及时看到，通过异步回调查询缓存
      let detailStore=wx.getStorageSync('isCollection')
          if(!detailStore){
            //一进来本地没有缓存的话就初始化缓存对象
            wx.setStorageSync('isCollection', {})
          }
          //判断用户是否收藏过
    if (detailStore[index]){//为真的话就表示用户收藏过
      this.setData({
        isCollection:true
      })
    }
    //监听音乐播放,箭头函数
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        isMusicPlay:true
      })
      //修改appdata中的值，就是app中的数值
      appdata.data.isPlay=true;
      appdata.data.pageIndex=index;
    });
    //判断当前音乐是否在播放
    if (appdata.data.isPlay && appdata.data.pageIndex===index){
      this.setData({
        isMusicPlay: true
      });
    }
    //监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isMusicPlay:false
      })
      //修改appdata中的值
      appdata.data.isPlay = false;
      //appdata.data.pageIndex = index;
    })
  },
  musicPlay(){
    //处理音乐播放
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });
    //控制音乐播放
    if (isMusicPlay){
      //播放音乐
      let {dataUrl,title}=this.data.detailObject.music
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      //暂停播放
      wx.pauseBackgroundAudio();
    }
  },
  handCollection(){
    let isCollection = !this.data.isCollection;
    this.setData({
      isCollection
    })
    let title = isCollection ? '收藏成功' : '取消收藏';
    wx.showToast({
      title,
      icon:'success'
    });
    //数据缓存到本地
    let {index} =this.data;
    wx.getStorage({
      key: 'isCollection',
      success:(datas) =>{
      let objet=datas.data;
      objet[index]=isCollection;
      wx.setStorage({
        key: 'isCollection',
        data: objet,
        success:()=>{
          console.log("缓存成功")
        }
      })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})