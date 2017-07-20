// searchMapLocation.js
var QQMapWX = require('../../../libs/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips:[],
    istext: false,
    searchKey: ''
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideKeyboard();
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

  clickSearchView: function () {
    this.setData({
      istext: true,
    });
  },

  bindKeyInput: function (e) {
    console.log(e);
    this.setData({
      searchKey: e.detail.value
    })
  },

  clickSearch: function (e) {
    var that = this;
    var keywords = that.data.searchKey;
    if (keywords ==""){
      wx.showModal({
        title: '请输入搜索内容',
        confirmColor: '#e75858',
        showCancel: false,
      })
      return;
    }
    var qqmapsdk = new QQMapWX({
      key: 'GV7BZ-RWP3W-Y52RR-RPYDN-6FWLZ-QXFQT'
    });
    console.log(e);
    qqmapsdk.getSuggestion({
      keyword: keywords,
      success: function (res) {
        console.log('sucess',res);
      },
      fail: function (res) {
        console.log('fail',res);
      },
      complete: function (res) {
        console.log('complete',res);
        that.setData({
          tips: res.data
        });
        if (that.data.tips==[]){
          wx.showModal({
            title: '没有找到您想要的结果',
            confirmColor: "#E75858",
            showCancel: false,
          })
        }

      }
    })
  },

  didSelectCell: function (e) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 3];
    console.log('didselectCell',e);
    var index = e.currentTarget.dataset.index;
    console.log('didselectCelldata', this.data.tips[index]);
    var locationData = this.data.tips[index];
    var latitude = locationData.location.lat//locationStr.split(',')[0]
    var longitude = locationData.location.lng;//locationStr.split(',')[1]
    prevPage.setData({
      sendAddress: locationData.province + ',' + locationData.city + ',' + (locationData.district == undefined ? '' : locationData.district),
      detailAddress: locationData.title == undefined ? '' : locationData.title,
      address: locationData.province + '/' + locationData.city + (locationData.district == undefined ? '' : ('/' + locationData.district)),
      location: longitude + ',' + latitude
    })
    var locationDic = { 'latitude': latitude, 'longitude': longitude };
    wx.setStorage({
      key: 'map_Location',
      data: locationDic,
    })
    wx.navigateBack({
      delta: 2
    })
  }
   
})