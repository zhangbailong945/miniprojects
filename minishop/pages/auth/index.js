// pages/auth/index.js
import {request} from "../../request/index.js"
import { getSetting, chooseAddress, openSetting, showModal, showToast, login } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取用户信息
  async handleGetUserInfo(e){

    try {
      const {encryptedData,iv,rawData,signature}=e.detail;
      //获取小程序登录后的token值
      const {code}=await login(encryptedData,rawData,iv,signature,code);
      const loginParams={}
      //发送请求
      //必须是企业账号 不然没有值
      //const {token}=await request({url:'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',data:loginParams,method:"post"});
      const token='test';
      wx.setStorageSync("token",token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
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