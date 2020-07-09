// pages/order/index.js
import regeneratorRuntime from "../../lib/runtime/runtime";
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'全部订单',
        isActive:true,
      },
      {
        id:1,
        value:'待付款',
        isActive:false,
      },
      {
        id:2,
        value:'待收货',
        isActive:false,
      },
      {
        id:4,
        value:'退货/退款',
        isActive:false,
      }
    ],
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleTabsItemChange:function(e){
    const {index}=e.detail;
    //修改原数组的激活效果
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //3复制到data中

    this.setData({
      tabs
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
  onShow: function (options) {
    const token=wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({url: '/pages/auth/index',});
      return;
    }
    //获取当前的小程序的页面栈-数组 长度最大是10页面
    let pages =  getCurrentPages();
    // 数组中 索引最大的页面就是当前页面
    let currentPage=pages[pages.length-1];
    const {type}=currentPage.options;
    //根据type 激活选中标题
    this.changeTitleByIndex(type-1);
    this.getOrderList(type);

      
  },
  async getOrderList(type){
    const res=await request({url:"/my/order/all",data:{type}});
    this.setData({
      orderList:res.orders.map(v=>({...v,create_time_cn:(new Date(v.crete_time*1000).toLocaleString())}))
    });
  },
  //根据标题索引来激活选中的标题数组
  changeTitleByIndex(index){
    //修改 源数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //重新 赋值到data
    this.setData({
      tabs
    });
  },
  handleTabsItemChange(e){
    //获取被单击的索引
    const {index}=e.detail;
    this.changeTitleByIndex(index);
    //2 重新发送请求
    this.getOrderList(index+1);

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