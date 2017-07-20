// mapLocation.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    currentLat:'',
    currentLon:'',
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentLocation()
    // this.configMap()
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

  /**
   * 地图
   */
  getCurrentLocation: function () {
    var that = this;
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log('location',res)
        that.setData({
          currentLat:latitude,
          currentLon:longitude,
          markers: [{ latitude: latitude, longitude: longitude, iconPath:'http://img.tianxiahuo.cn/public/NetFile/20170713/901268273f91f5774ea87e6ae336c251.png'}]
        })
        that.configMap();
      },
    })
  },

  configMap: function () {
    var that = this;

    var qqmapsdk = new QQMapWX({
      key: 'GV7BZ-RWP3W-Y52RR-RPYDN-6FWLZ-QXFQT'
    });
    // 调用接口
    console.log('---讲纬度', that.data.currentLat);
    qqmapsdk.search({
      keyword: '超市',
      location: {
        latitude: that.data.currentLat,
        longitude: that.data.currentLon
      },
      success: function (res) {
        console.log('qqmap_success',res);
      },
      fail: function (res) {
        console.log('qqmap_fail',res);
      },
      complete: function (res) {
        console.log('qqmap_complete',res);
        that.setData({
          addressList: res.data
        })
      }
    });
    

  },

  //点击地址
  didSelectCell: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id
    console.log('----event', that.data.addressList[index])
    var locationData = that.data.addressList[index]
    console.log('----', locationData.location)
    // var locationStr = locationData.location;
    var latitude = locationData.location.lat;//locationStr.split(',')[0]
    var longitude = locationData.location.lng;//locationStr.split(',')[1]
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      sendAddress: locationData.ad_info.province + ',' + locationData.ad_info.city + ',' + locationData.ad_info.district,
      detailAddress: locationData.title,
      address: locationData.ad_info.province + '/' + locationData.ad_info.city + '/' + locationData.ad_info.district,
      location: longitude + ',' + latitude
    })
    var locationDic = {'latitude':latitude,'longitude':longitude};
    wx.setStorage({
      key: 'map_Location',
      data: locationDic,
    })
    wx.navigateBack({
      delta: 1
    })
  },

  // 点击搜索框
  bindSearchTap: function () {
    wx.navigateTo({
      url: 'searchMapLocation/searchMapLocation',
    })
  }

})