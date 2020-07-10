// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'体验问题',
        isActive:true,
      },
      {
        id:1,
        value:'商品、商家问题',
        isActive:false,
      }
    ],
    chooseImages:[],
    textValue:''
  },
  UploadImages:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleChooseImage(){
    //调用小程序 API
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImages:[...this.data.chooseImages,...result.tempFilePaths]
        });
      }
    });
      
  },
  handleRemoveImage(e){
    const {index}=e.currentTarget.dataset;
    let {chooseImages}=this.data;
    chooseImages.splice(index,1);
    this.setData({
      chooseImages
    });
  },
  handleTextInput(e){
    this.setData({
      textValue:e.detail.value
    });
  },
  handleFormSubmit(){
    const {textValue,chooseImages}=this.data;
    if(!textValue.trim()){
      
      wx.showToast({
        title: '请您输入要反馈的内容',
        icon: 'none',
        duration: 1500,
        mask: true
      });
      return;
    }
    //准备上传图片到后台
    //api 不支持 多张图片 同时上传到服务器 只能遍历数组 逐个上传
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    });
    if(chooseImages.length!=0){
      chooseImages.forEach((v,i)=>{
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/', //图片上传的地址
          filePath: v, //被上传的文件的路径
          name: "file", //文件名称 file
          formData: {}, //顺带的文本信息
          success: (result) => {
            let url=JSON.parse(result.data).url;
            this.UploadImages.push(url);
            if(i===chooseImages.length-1){
              wx.hideLoading();
              console.log('上传到后台!');
              this.setData({
                textValue:'',
                chooseImages:[]
              });
              wx.navigateBack({
                delta: 1
              });    
                
            }
          }
        });

        });
    }
    else{
      wx.hideLoading();
      console.log('只是提交了文本!');
      wx.navigateBack({
        delta: 1
      });
        
    }
        
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