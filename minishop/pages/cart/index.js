// pages/cart/index.js

import {getSetting,chooseAddress,openSetting} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //获取缓存中的收货地址
    const address=wx.getStorageSync("address");
    //获取缓存中的购物车数据
    const cart=wx.getStorageSync("cart")||[];
    //计算全选
    //every 数组方法 会便利 会接受一个回调函数  那么每一个回调函数都返回true
    const allChecked=cart.length?cart.every(v=>v.checked):false;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num+v.goods_price;
        totalNum+=v.num;
      }
    })

    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
      
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

  },
  /*点击收货地址 */
  async handleChooseAddress(e) {
    try {
      //获取收货地址
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting['scope.address'];
      if (scopeAddress === false) {
        //用户曾经拒绝过授权
        await openSetting();

      }
      let address = await chooseAddress();
      address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      //存入缓存中
      wx.setStorageSync("address", address);
        
    } catch (error) {
      console.log(error);
    }

  }

})