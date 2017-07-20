// editAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    contact: '',
    address: '',
    detailAddress: '',
    isDefaultAddress: '0',
    sendAddress: '',
    currentAddressId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentAddressId: '0',
    });

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
   * 点击事件
   */
  // 设为默认地址
  changeAddressStatus: function (e) {
    this.setData({
      isDefaultAddress: e.detail.value == true ? '1' : '0'
    })
  },

  // 选择省市区
  chooseProvince: function (e) {
    wx.navigateTo({
      url: '../mapLocation/mapLocation',
    })
  },

  // 保存地址
  saveAddress: function () {
    var that = this;
    if (that.data.name == "" || that.data.contact == "" || that.data.address == "" || that.data.detailAddress == "") {
      that.showAlertView('标红项不能为空!')
    } else {
      if (!/^[\u4e00-\u9fa5a-zA-Z]{2,14}$/.test(that.data.name)) {
        that.showAlertView('姓名支持2-14位中文、英文任意组合！')
      } else if (!/^((0\d{2,3}-\d{7,8})|(1[35784]\d{9}))$/.test(that.data.contact)) {
        that.showAlertView('请输入正确的联系电话！')

      } else if (that.data.detailAddress.length < 2 || that.data.detailAddress.length > 61) {

        that.showAlertView('地址长度为3 - 60个字 ！')

      } else {
        that.saveAddressRequest();
      }

    }
  },

  showAlertView: function (content, ) {
    wx.showModal({
      content: content,
      confirmColor: "#E75858",
      showCancel: false,
    })
  },

  /**
   * 数据请求
   */
  // 保存地址
  saveAddressRequest: function () {
    wx.showToast({
      title: '保存成功',
    })
  },

  /**
   * 监测方法
   */
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  inputContact: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  inputDetail: function (e) {
    this.setData({
      detailAddress: e.detail.value
    })
  }
})