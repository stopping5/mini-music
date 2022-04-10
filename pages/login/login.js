/**
  作者: Created by zhiyongzaixian
  说明: 登录流程
  1. 收集表单项数据
  2. 前端验证
    1) 验证用户信息(账号，密码)是否合法
    2) 前端验证不通过就提示用户，不需要发请求给后端
    3) 前端验证通过了，发请求(携带账号, 密码)给服务器端
  3. 后端验证
    1) 验证用户是否存在
    2) 用户不存在直接返回，告诉前端用户不存在
    3) 用户存在需要验证密码是否正确
    4) 密码不正确返回给前端提示密码不正确
    5) 密码正确返回给前端数据，提示用户登录成功(会携带用户的相关信息)
*/
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号
    password: '' // 用户密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 表单项内容发生改变的回调
  handleInput(event){
    // let type = event.currentTarget.id;// id传值 取值： phone || password
    let type = event.currentTarget.dataset.type; // data-key=value
    //console.log(event);
    //[] 动态赋值
    this.setData({
      [type]: event.detail.value
    })
    //console.info(type,this.data.phone);
  },
  
  //调用网易云登录接口
  async loginRPC(phone,password){
    let loginResult = await request("/login/cellphone",{phone,password});
    return loginResult;
  },
  
  // 登录的回调
  async login(){
    // 1. 收集表单项数据
    //es6 写法
    let {phone, password} = this.data;
    //相当于
    // let phone = this.data.phone;
    // let password = this.data.password;
    console.info(phone,password);
    // 2. 前端验证
    /*
    * 手机号验证：
    *   1. 内容为空
    *   2. 手机号格式不正确
    *   3. 手机号格式正确，验证通过
    * */
   if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return;
   }

   if(!password){
    wx.showToast({
      title: '密码不能为空',
      icon: 'none'
    })
    return;
 }

   //验证手机号是否合法
   let phoneRex = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
   if(!phoneRex.test(phone)){
      wx.showToast({
        title: '手机号有误',
        icon: 'none'
      })
      return;
   }
   //登录网易云
   let loginnResult = await this.loginRPC(phone,password);
   console.info(loginnResult.message);
   if(loginnResult.code === 200){
    let userinfo = wx.getStorageSync('userInfo');
    if(userinfo){
      console.info('存在缓存数据，清除...');
      wx.removeStorageSync('userInfo')
    }
    //保存用户信息
    wx.setStorageSync('userInfo', loginnResult.profile);

    wx.showToast({
      title: '登录成功..',
      icon: 'success'
    })

    //跳转回个人中心
    wx.reLaunch({
      url: '/pages/personal/personal'
    });
      
   }else{
      wx.showToast({
        title: loginnResult.message,
        icon: 'none'
      })
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
