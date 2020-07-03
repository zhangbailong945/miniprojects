// pages/goods_list/index.js
/*
用户上滑页面 滚动条触底 开始加载下一页数据
1、找到滚动条触底事件
2、判断有没有下一页数据
3 没数据 提示弹出一个提示
4 有数据 加载数据
*/
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
        value:'综合',
        isActive:true,
      },
      {
        id:1,
        value:'销量',
        isActive:false,
      },
      {
        id:2,
        value:'价格',
        isActive:false,
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
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

  //获取商品列表数据
  async getGoodsList(){
    const res=await request({
      url:"/goods/search",
      data:this.QueryParams
    })
        //获取总条数
    
    const total=res.total;
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    this.setData({
      //拼接的数组
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
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
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({title: '没有更多了！'});
        
    }
    else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  onPullDownRefresh:function(){
    //重置数组
    this.setData({
      goodsList:[]
    })
    //重置页面
    this.QueryParams.pagenum=1;
    //发送请求
    this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})