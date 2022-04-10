import request from '../../utils/request.js';

//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数据
    bannerList: [],
    personalizedList: [],
    //排行榜数据
    topList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // wx.request({
    //   url: 'http://localhost:3000/banner', //仅为示例，并非真实的接口地址
    //   data: {
    //     type: '2'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })

    // 获取banner数据
    let bannnerData = await request('/banner',{type:2})
    this.setData({
      bannerList: bannnerData.banners
    });

    // 获取歌单数据
    let gedanData = await request('/personalized',{limit:10})
    this.setData({
      personalizedList: gedanData.result
    });

    //获取排行榜数据
    let topIndex = 0;
    let resultArr = [];
    while(topIndex < 5){
      let topData = await request('/top/list',{idx:topIndex++});
      let topItem = {name: topData.playlist.name,tracks: topData.playlist.tracks.slice(0,3)};
      resultArr.push(topItem);
      this.setData({
        topList: resultArr
      });
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

