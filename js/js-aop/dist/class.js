"use strict";

var _class, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

// 1.
// Array.isArray() //判断是否是一个数组
// Array.prototype.push() //这两个方法的位置是不一样的，一个是在链上
// // 位置的区别是什么？
// // class下面有一个关键词叫static 静态属性 就是面向对象的支持
// // 有一个词，叫实例化
// class Man{
//     static isMan() {
//         console.log('yes');
//     }
//     say() {
//         console.log('i can say');
//     }
// }
// let boy = new Man();
// boy.isMan(); //静态属性不能这样调用，只能用Man.isMan()调用//类名访问属性
// boy.say(); //实例访问属性
// 2.类的装饰，重点在装饰
// isAnimal就是一个方法
// @ 浏览器不支持，装个Babel 配置babelrc配置文件
// 1.通过target传参把原始的target传进去
// 原始的target 指向原始的类 那就是修改原始的类 <=针对类而言，原始的是target
function isAnimal(target) {
  console.log(target); // 2.修改 是做一个增强，没有破坏，不用恢复

  target.isAnimal = function () {
    console.log('yes');
  };

  return target;
}

function isThing(target) {
  console.log(target); // 这里的没有对target造成破坏,我们只是挂了一个功能，是新增一个属性，没有重写

  target.isThing = function () {
    console.log('thing');
  };

  return target;
} //  1. 原始的没有修改的是work这个函数 《=针对方法而言，是原始的work
// 装饰器提供三个参数


function listenCall(target, name, descriptor) {
  // 通过对应的位置拿到原始的东西
  // 解释：
  // 只要对方法装饰，原始的就存在descriptor.value中
  // 就像是原来是：
  // descriptor.value = function work(){}
  // 然后我们后面直接把这个方法重写了，所以造成了破坏，要恢复
  var origin = descriptor.value; //2. 修改 定义在哪个位置，就在那个位置上修改

  descriptor.value = function () {
    // 想通过装饰器动态注入的功能
    console.log('我监听到你发生调用了'); // 这里对原来的功能造成破坏了，重写了

    origin();
  };
}

var Man = isThing(_class = isAnimal(_class = (_class2 = /*#__PURE__*/function () {
  function Man() {
    _classCallCheck(this, Man);
  }

  _createClass(Man, [{
    key: "say",
    value: function say() {
      console.log('i can say');
    } // 方法的装饰：
    // 监听这个方法有没有被调用，这是类上的方法

  }, {
    key: "work",
    value: function work() {
      // 没有装饰器就这样监听：
      // console.log('work func called'); //因为被调用了就一定会走这里，但这也是侵入式的修改 用装饰器
      console.log('i am working');
    }
  }], [{
    key: "isMan",
    value: function isMan() {
      console.log('yes');
    } // 没有装饰器的时候怎么
    // 侵入式的修改

  }, {
    key: "isAnimal",
    value: function isAnimal() {}
  }]);

  return Man;
}(), (_applyDecoratedDescriptor(_class2.prototype, "work", [listenCall], Object.getOwnPropertyDescriptor(_class2.prototype, "work"), _class2.prototype)), _class2)) || _class) || _class;

var boy = new Man(); // boy.isMan(); //静态属性不能这样调用，只能用Man.isMan()调用//类名访问属性

boy.say(); //实例访问属性
// 装饰了

Man.isAnimal();
Man.isThing();
boy.work();
/**
 * @connect(mapDispatch, mapState)(Header)
 * class Header extends Component {
 * 
 * }
 * 
 */