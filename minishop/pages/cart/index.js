// pages/cart/index.js

import {getSetting,chooseAddress,openSetting, showModal,showToast} from "../../utils/asyncWx.js";
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
    this.setData({address});
    this.setCart(cart);
    // let allChecked=true;
    // //const allChecked=cart.length?cart.every(v=>v.checked):false;
    // let totalPrice=0;
    // let totalNum=0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice+=v.num+v.goods_price;
    //     totalNum+=v.num;
    //   }
    //   else{
    //     allChecked=false;
    //   }
    // })

    // allChecked=cart.length!=0?allChecked:false;

    // this.setData({
    //   address,
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
      
  },
  //商品的选中事件
  handleItemChange(e){
    //获取商品的ID
    const goods_id=e.currentTarget.dataset.id;
    let {cart}=this.data;
    //找到被修改的商品对象
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
    // wx.setStorageSync("cart",cart);
    // //重新计算全选，总价格 总数量
    // //计算全选
    // //every 数组方法 会便利 会接受一个回调函数  那么每一个回调函数都返回true
    // let allChecked=true;
    // //const allChecked=cart.length?cart.every(v=>v.checked):false;
    // let totalPrice=0;
    // let totalNum=0;
    // cart.forEach(v=>{
    //   if(v.checked){
    //     totalPrice+=v.num+v.goods_price;
    //     totalNum+=v.num;
    //   }
    //   else{
    //     allChecked=false;
    //   }
    // })

    // allChecked=cart.length!=0?allChecked:false;
    // this.setData({
    //   cart,
    //   allChecked,
    //   totalPrice,
    //   totalNum
    // })
  },
  //设置购物车状态,计算 数据 全选 总价格
  setCart(cart){
    
    //重新计算全选，总价格 总数量
    //计算全选
    //every 数组方法 会便利 会接受一个回调函数  那么每一个回调函数都返回true
    let allChecked=true;
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }
      else{
        allChecked=false;
      }
    });

    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });

    wx.setStorageSync("cart",cart);
  },
  //商品的全选功能
  handleItemAllCheck(){
    //获取data中的数据
    let {cart,allChecked}=this.data;
    //修改值
    allChecked=!allChecked;
    //循环修改cart数组
    cart.forEach(v=>v.checked=allChecked);
    //重新填充值
    this.setCart(cart);

  },
  //商品的数量编辑功能
  async handleChangeNumber(e){
    1//获取参数
    const {flag,id}=e.currentTarget.dataset;
    let {cart}=this.data;
    const index=cart.findIndex(v=>v.goods_id===id);
    if(cart[index].num===1&&flag===-1){
      // wx.showModal({
      //   title: '提示',
      //   content: '确定要删除该商品么？',
      //   showCancel: true,
      //   cancelText: '取消',
      //   cancelColor: '#000000',
      //   confirmText: '确定',
      //   confirmColor: '#3CC51F',
      //   success: (result) => {
      //     if (result.confirm) {
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     }
      //     else if(result.cancel){
      //       return ;
      //     }
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });
      const result=await showModal({content:'你是否要删除？'});
      if (result.confirm) {
        cart.splice(index,1);
        this.setCart(cart);
      }
    }
    else{
      cart[index].num+=flag;
      this.setCart(cart);
    }
  },
  //结算
  async handlePayClick(){
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:'您还没有提供收货地址。'});
      return ;
    }
    if(totalNum==0){
      await showToast({title:'您还没有选购商品。'});
      return ;
    }

    wx.navigateTo({
      url: '/pages/pay/index',
    });
      
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