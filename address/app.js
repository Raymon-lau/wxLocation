//app.js
App({
  onLaunch: function () {
    this.getLocationData();
  },
  
  getLocationData: function () {
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var locationDic = { 'latitude': latitude, 'longitude': longitude };
        wx.setStorage({
          key: 'map_Location',
          data: locationDic,
        })
      }
    })
  }
})