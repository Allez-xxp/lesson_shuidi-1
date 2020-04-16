var getUserInfo3 = function (user) {
    //再用个:{}把user里面有的属性，及其对象的类型也声明
    // if(true) {
    //     return 123; //这里返回整数，后面的return又要求返回字符串，这样的代码是不行的(js中可以)
    // }
    //要用好ts的类型约束
    return "name: " + user.name + ", age: " + user.age;
};
getUserInfo3({ name: 'linan', age: 20 }); //编译一下：tsc 3.ts
