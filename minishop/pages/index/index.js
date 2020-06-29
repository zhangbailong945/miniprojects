//Page Object
//引入 发送请求的方法
import {request} from "../../request/index.js"
Page({
  data: {
    //轮播图数组
    swiperList:[],
    categoryList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options) {
    //发送异步请求，获取轮播图数据 优化手动通过es6的promise来解决
    // wx.request({
    //   url: 'http://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCategoryList();
    this.getFloorList();


      
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  },
  //获取轮播图数据
  getSwiperList:function(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
  },
  //获取分类数据
  getCategoryList:function(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result=>{
      this.setData({
        categoryList:result.data.message
      })
    })
  },
  //获取轮播图数据
  getFloorList:function(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"})
    .then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  }
});
  