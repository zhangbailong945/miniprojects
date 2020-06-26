// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //要接受的数据名称
    tabs:{
      //type 要接受的数据类型
      type:"Array",
      //默认值
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap:function(e){
      /*
      1.绑定事件
      2.获取被点击的索引
      3.获取原数组
      4.对数组循环 
        4-1 给每一个循环属性 选中属性 改为false
        4-2 给 当前的索引的想添加激活选中效果

      5.获取索引
      6.点击事件触发的时候
        6-1 触发父组件中的自定义事件 同时传递数据给父组件
        this.triggerEvent("父组件自定义的名称"，要传递的数据)
      */
     const {index}=e.currentTarget.dataset;
     //let tabs=this.data.tabs; 结构对复杂类型进行结构的时候，复制了一份。
     //最严谨的方法 是拷贝一份 再修改
     //let tabs=JSON.parse(JSON.stringify(this.data.tabs));
     //let {tabs}=this.data;
     //[].forEach 遍历数组 遍历数组的时候 修改了v,也会导致原数组被修改 
     //tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
     //this.setData({
       //tabs
     //})
     this.triggerEvent("itemChange",{index});

    }
  }
})
