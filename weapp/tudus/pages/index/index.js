Page({
  data:{
    addShow:false,
    focus:false,
    //todos list
    //全部、已完成、未完成.......
    //哪几个数据页面？
    lists:[],//所有的todes（列表）,现在为空说明列表为空
    curLists:[],//当前的状态todos
    status:'1'//用来表示当前不同状态
  },
  addTodoShow(event){
    this.setData({
      addShow:true,
      focus:true
    })
  },
  showStatus(e){
    var st=e.currentTarget.dataset.status;
    if(st===this.data.status) return;
    //改当前状态值
    if(this.data.status==='1'){
      this.setData({
        curLists:this.data.lists,
        status:st
      })
      return;
    }
    this.setData({
      status:st,
      curLists:this.data.lists.filter(item=>+item.status===(st-2))
    })
  },
  addTodo(){
    var temp=this.data.lists;
    var addT={
      id:new Date().getTime(),
      title:this.data.addText,
      status:'0'
    }
    temp.push(addT);
    this.setData({
      lists:temp,
      curLists:temp,
      addShow:false//表单消失
    })
  },
  setInput(e){
    this.setData({
      addText:e.detail.value
    })
  }
})