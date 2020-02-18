let template = '我是{{name}}, 年龄{{age}}, 性别{{sex}}'; //待编译的模版

let data = {
  name: '蔡徐坤',
  age: 18
}
// vue 的第一个功能render()
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; //不做贪婪匹配
  if (reg.test(template)) { //测试是否需要翻译 //退出条件    
    //exec是vue 源码里模板编译用的正则方法，就是执行一下正则的测试
    // 这个方法，返回的第一项就是匹配到的分组{{name}};第二项是匹配的单元中的，就是name;第三项就是index,从0开始。
    const key = reg.exec(template)[1];
    console.log(key);
    template = template.replace(reg, data[key]);
    return render(template, data); //递归，分成多个小任务
  }
  return template;
  // vue 的第一个功能render()
  // 用什么方法？ 
  // 正则 + replace {{}}单项数据流，是占位符，其实就是一种规则
  // 1. {{(?)+}} 花括号在正则中式长度的表达式，所以是正则的一部分，若要使用{则要先转义，加上'\';\w+匹配一切字符，+是匹配一次或多次
  // 2. $1   data[key] 
  // 3. replace 替换
}
console.log(render(template, data));

 
// new Vue({
//   el: '#app',
//   data() {
//     return {
          name: ''
//     }
//   }
// })
