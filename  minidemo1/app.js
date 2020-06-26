//app.js
App({
  onLaunch: function () {
    console.log('onLaunch');
    /*
    不能触发onPageNotFound
    wx.navigateTo({
      url: '/11/22/33',
    });
    */
    //在应用第一次的时候 获取用户的个人信息
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow:function(e){
    //对整个应用的数据或页面效果 重置
    console.log('onShow');
  },
  onHide:function(e){
    //暂停或者清楚 定时器
    console.log('onHide');
  },
  onError:function(err){
    //应用代码发生了报错的时候 就会触发
    //在应用发生代码报错的时候，手机用户的错误信息，通过异步请求，就错误的信息发送到后台
    console.log('onError');
    console.log(err);
  },
  onPageNotFound:function(e){
    //在页面找不到的时候触发
    //应用第一次启动的时候，如果找不到第一页 才会触发
    //如果也不存在了  通过JS的方式 重新跳转页面 重新跳到第二个首页
    //console.log('onPageNotFound');
    wx.navigateTo({
      url: '/pages/demo07/demo07'
    });
  },
  globalData: {
    userInfo: null
  }
})