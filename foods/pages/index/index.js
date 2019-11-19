Page({
  //data可通过wx:for="{{entities}}"循环输出
  data:{
    entities:[
      {
        imageUrl:'../../assets/images/landscape.png',
        title:'c',
        description:'cc'
      },
      {
        imageUrl: '../../assets/images/landscape.png',
        title: 'c',
        description: 'cc'
      },
      {
        imageUrl: '../../assets/images/landscape.png',
        title: 'c',
        description: 'cc'
      },
      {
        imageUrl: '../../assets/images/landscape.png',
        title: 'c',
        description: 'cc'
      },
      {
        imageUrl: '../../assets/images/landscape.png',
        title: 'c',
        description: 'cc'
      },
      {
        imageUrl: '../../assets/images/landscape.png',
        title: 'c',
        description: 'cc'
      },
      {
        imageUrl: '../../assets/images/landscape.png',
        title: 'c',
        description: 'cc'
      }
    ]
  },
  onLoad(){
    console.log('onLoad');
  },
  // 生命周期函数
  onReachBottom(){
    //console.log('触底了');目的加载下一页信息
    const data=[...this.data.entities,
    ...this.data.entities];
    this.setData({
      entities:data
    })
  }
})