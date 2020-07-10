// pages/search/index.js
import regeneratorRuntime from "../../lib/runtime/runtime";
import {request} from "../../request/index.js";

/**
 * 1.防抖 一般 输入框中 防止重复输入
 * 2 节流 一般是页面 的上拉或者下拉
 * 
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    isFocus:false,
    inputValue:''
  },
  TimeId:-1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //输入框的值改变 就会触发
  handleInput(e){
    //获取输入框的值
    const {value}=e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      });
      return;
    }
    this.setData({
      isFocus:true
    });
    //发送请求
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
    
  },
  //发送请求 查询商品
  async qsearch(query){
    const res=await request({url:'/goods/search',data:{query}});
    this.setData({
      goods:res.goods
    });
  },
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    });
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