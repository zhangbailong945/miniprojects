// pages/category/index.js

import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //左侧的菜单数据
  leftMenuList:[],
  //右侧的商品数据
  rightShopList:[],
  //接口数据
  cascades:[],
  //被点击的左侧菜单
  currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCascades();
  },
  getCascades:function(){
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(
      res=>{
        this.cascades=res.data.message;
        let leftMenuList=this.cascades.map(v=>v.cat_name);
        let rightShopList=this.cascades[0].children;
        this.setData({
          leftMenuList,
          rightShopList
          
        })
      }
    )
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