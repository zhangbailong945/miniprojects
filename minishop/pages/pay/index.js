// pages/cart/index.js
/**
 * 那些人 那些账号 可以实现微信支付
 *  1.必须选择企业账号
 *  2.企业账号的小程序后台中 必须绑定添加上白名单
 *    1.一个appid可以同时绑定多个开发者
 */

import { getSetting, chooseAddress, openSetting, showModal, showToast,login, requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import {request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
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
    const address = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    //计算全选
    //every 数组方法 会便利 会接受一个回调函数  那么每一个回调函数都返回true
    //过滤后的购物车
    cart = cart.filter(v => v.checked);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    });

    this.setData({
      cart,
      address,
      totalPrice,
      totalNum
    });

  },
  async handleOrderPay() {
   try {
      //1 判断缓存中有没有token
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    //准备创建订单
    //请求头
    //请求体
    const order_price=this.data.totalPrice;
    const consignee_addr=this.data.address.all;
    const cart=this.data.cart;
    
    let goods=[];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }));
    const orderParams={order_price,consignee_addr,goods}
    //发送请求 创建订单 获取订单编号
    //const {order_number}=await request({url:"/my/orders/create",method:"POST",data:orderParams});
    //发起预支付接口
    const order_number='HMDD201908090000000001061';
    //const {pay}=await request({url:"/orders/req_unifiedorder",method:"POST",data:{order_number}});
    //发起微信支付
    const pay={
      nonceStr:"U6tYJNdYvm3ReKgI",
      package:"prepay_id=wx09182118356902a15c8b8d071931343000",
      paySign:"C514E29387794F84004C983AFFF4707F",
      signType:"MD5",
      timeStamp:"1565346079"
    };
    await requestPayment(pay);
    //查询后台订单
    const res=await request({url:"/orders/chOrder",method:"POST",data:{order_number}});
    await showToast({title:'支付成功!'});
    //手动删除缓存中已经支付的商品
    let newCart=wx.getStorageSync("cart");
    newCart=newCart.findFilter(v=>!v.checked);
    wx.setStorageSync("cart",newCart);
      
      
    wx.navigateTo({
      url: '/pages/order/index'
    });
      
   } catch (error) {
     await showToast({title:'支付失败!'});
   }

  },
  //点击支付的功能

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
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //存入缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }

  }

})