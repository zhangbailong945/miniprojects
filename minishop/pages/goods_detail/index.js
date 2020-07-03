// pages/good_detail/index.js
import regeneratorRuntime from "../../lib/runtime/runtime";
import {request} from "../../request/index.js";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    this.getGoodsDetail(goods_id);

  },
  /*获取商品的详情数据 */
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone部分手机 不识别 webp 图片格式
        //确保后台存在 1.webp 1.jpg
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
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

  },
  /*点击轮播图放大功能 */
  handlePreviewImage(e){
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    const current=e.currentTarget.dataset.url;
    wx.previewImage({
      current:current,
      urls:urls
    });
      
  },
  /* 加入购物车 */
  handleAddCart(e){
    let cart=wx.getStorageSync('cart')||[];
    //判断商品是否存在购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      //不存在 
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }
    else{
      //已经存在购物车
      cart[index].num++;
    }

    //将购物车重新填回换成
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '',
      icon: 'success',
      mask: true
    });
  }


})