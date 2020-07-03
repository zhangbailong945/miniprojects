// pages/category/index.js
import regeneratorRuntime from "../../lib/runtime/runtime";
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
  currentIndex:0,
  //右侧内容的滚动条距离顶部的距离
  scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    1 先判断本地存储是否有旧的数据
    {time:Data.now(),data:[]}
    2 没有旧的数据 直接发送请求
    3 有旧的数据 同时 旧的数据也没有过去 旧使用 本地存储的旧数据即可
    */
    //获取 本地存储中的数据
    const Categorys=wx.getStorageSync("categorys");
    if(!Categorys){
      this.getCascades();
    }
    else{
      //有旧的数据 定义过期时间为10秒钟
      if(Date.now()-Categorys.time>1000*10){
        this.getCascades();
      }
      else{
        this.cascades=Categorys.data;
        let leftMenuList=this.cascades.map(v=>v.cat_name);
        let rightShopList=this.cascades[0].children;
        this.setData({
          leftMenuList,
          rightShopList
          
        })
      }

    }
      
  },
  async getCascades(){
    // request({
    //   url:"/categories"
    // }).then(
    //   res=>{
    //     this.cascades=res.data.message;
    //     //把接口的数据存储到本地存储中
    //     wx.setStorageSync("categorys",{time:Date.now(),data:this.cascades});
          
          
    //     let leftMenuList=this.cascades.map(v=>v.cat_name);
    //     let rightShopList=this.cascades[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightShopList
          
    //     })
    //   }
    // )

    //1.使用es7的async 发送异步请求
    const res=await request({url:'/categories'});

    this.cascades = res;
    //把接口的数据存储到本地存储中
    wx.setStorageSync("categorys", { time: Date.now(), data: this.cascades });


    let leftMenuList = this.cascades.map(v => v.cat_name);
    let rightShopList = this.cascades[0].children;
    this.setData({
      leftMenuList,
      rightShopList

    })

  },
  //左侧菜单的点击事件
  handleItemTap:function(e){
    /* 
    1获取菜单标题的索引
    2给data中的currentIndex赋值
    3根据不同的索引 渲染右侧的商品
    */
   const {index}=e.currentTarget.dataset;
   let rightShopList=this.cascades[index].children;
   this.setData({
     currentIndex:index,
     rightShopList,
     //重新设置右侧滚动体到顶部的距离scroll-vivew
     scrollTop:0
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