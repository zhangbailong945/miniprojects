// pages/demo16/demo16.js
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
    //发送异步请求，初始化页面数据
    console.log('onLoad');
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //
    console.log('onShow');
  },

    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //页面的数据或者效果 重新刷新
    //需要页面出现 滚动才行
    console.log('onPullDownRefresh');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage');
  },
  onPageScroll:function(){
    console.log('onPageScroll');
  },
  /**
   * 页面的尺寸发生改变的时候 触发
   * 横屏 竖屏切换的时候 触发
   */
  onResize:function(){
    console.log('onResize');
  },
  onTabItemTap:function(){
    //1.必须要求当前页面 是tabbar页面
    //2.点击的自己的tab item才能触发该事件
    console.log('onTabItemTap');
  }
})