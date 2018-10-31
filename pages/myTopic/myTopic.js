//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
const api = require('../../utils/api.js')
Page({
  data: {
    alltolicarr:[],
    tolicarr:[],
    toView: 'red',
    scrollTop: 100,
    state:false,
    page:0,
    nodata: false
  },
  //事件处理函数
  onLoad: function () {
    let _this = this;
    this.getdata()
  },
  getdata:function(){
    api.getmyTopic(this.data.page).then((data) => {
      if (!data.data.length) {
        this.setData({
          nodata: true
        })
      }
      this.data.tolicarr = this.data.tolicarr.concat(data.data)
      this.setData({
        tolicarr: this.data.tolicarr,
        state: true,
        page: this.data.page += 1
      })
    })
  },
  ondelete: function (e){
    wx.showModal({
      title: '',
      showCancel: true,
      content: '您确定删除这条题目吗,删除题目不会影响加入试卷的题目',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
          })
          api.deleteTopic(e.target.id).then((data)=>{
            if(data.data === 1){
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
              for (let i = 0; i < this.data.tolicarr.length;i++){             
                if (this.data.tolicarr[i]._id == e.target.id){
                  this.data.tolicarr.splice(i, 1)
                  this.data.alltolicarr.splice(i, 1)
                  this.setData({
                    tolicarr: this.data.tolicarr,
                    alltolicarr: this.data.alltolicarr
                  })
                }
              }
            }else{
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      },
    })  
  },
  onback: function (){
    wx.switchTab({
      url: '../personalCenter/personalCenter',
      success: function () {

      }
    })
  },
  onsee: function (e) {
    let data = JSON.stringify(this.data.tolicarr[e.target.id]).replace(/=/img, '08862ca061997a4d').replace(/&/img, '54f19ac2aa52aac5').replace(/\?/img, 'c3fb323a2671125a');
    wx.navigateTo({
      url: '../subjectDetails/subjectDetails?data=' + data,
      success: function () {

      }
    })
  },
  tolower: function () {
    if (!this.data.nodata) {
      this.getdata()
    }
  },
  over: function () {
    // console.log(33333)
  },
  upper: function () {
    // console.log(33333)
  }

})
