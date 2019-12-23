//多态 鸭子模型 只要对象具有统一的接口，那么可以互换使用
var makeSound=function(animal){
    //多种声音
    // if(animal instanceof Duck){
    //     console.log('嘎嘎');
    // }//instanceof是谁的实例
    // else if(animal instanceof Chicken) {
    //     console.log('咯咯咯');
    // }

    animal.say();//面向对象的优化
}

// 未使用多态
var Duck=function(){};
Duck.prototype.say=function(){
    console.log('嘎嘎嘎嘎');
}
var Chicken=function(){};
Chicken.prototype.say=function(){
    console.log('gegegegegegge');
}
makeSound(new Chicken());