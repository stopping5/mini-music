import request from "../../utils/request";
// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    recentPlayList: []
  },

  //跳转登录页面
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  async loadHistorySong(uid){
    let index = 0;
    let historySong = await request("/user/record",{uid,typr: 1});
    console.info(historySong);
    this.setData({
      recentPlayList: historySong.weekData.slice(0,10).map(item => {
        item.id = index++;
        return item;
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userInfo');
    if(userinfo){
      this.setData({
        userInfo: userinfo
      });
      
      this.loadHistorySong(this.data.userInfo.userId);
   
    }
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