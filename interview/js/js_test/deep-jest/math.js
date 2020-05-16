function add(a, b) {
    return a + b;
}
function min(a,b) {
    return a-b;
}

// 再加一个 合并对象
function mixin(obj1, obj2) {
    return {
        ...obj1,
        ...obj2
    }
}

// 有一个期望值和一个真实值
// let expect = 10;
// let res = add(7,3);

// // 测试
// if (expect !== res) {
//     throw new Error('add 出错了');
// }
// let expect = 4;
// let res = min(7,3);

// // 测试
// if (expect !== res) {
//     throw new Error('min 出错了');
// }

// 如果每次都要写期望值和真实值，麻烦，所以封装一个api，接受一个真实值和一个期望值，对比的过程封装起来

// 一个是真实值，一个是期望值
// should
// 这个就是断言库
function should(result) {
    return  {
        // 我们只封装了equal
        equal:function(expect) {
            if(result !== expect) { //因为只是测试了基本数据类型，所以，只用了!==,比较粗糙
                throw new Error('不通过')
            }
        }
    }
}

// 再加描述 描述是过还是不过，看should,有没有throw,要进行try catch的捕获
function it(desc, fn) {
    // 意料之中的错 try catch 一项不通过不会影响后面的进行
    try {
        fn(); //就是要写的测试
        console.log(`✔: ${desc} pass`)
    } catch {
        console.log(`×: ${desc} fail`)
    }
}
it('test add', ()=>{
    should(add(7,3)).equal(10);
})
it('test min', () => {
    should(min(7,3)).equal(4);
})
it('test mixin', () => {
    let obj = mixin({a:1}, {b:2});
    should(obj).equal({a:1, b:2}); //两个对象合并起来，成为一个对象,对象不是基本数据类型，所以不能直接用!==来判断
})
// 因为有catch,所以一项不通过，不会阻塞后面的

// 来断言一下就知道测试过没过了
// should(add(7,3)).equal(10);
// should(min(7,3)).equal(4);
// should是断言库中的一个方法，我们这里没有借助断言库，自己封装了一个should


// 怎么知道是哪里没通过呢？
// 再包一层it，描述这个测试是个什么测试，就知道在进行什么测试,报错的时候就知道给哪个报错
// 一个it就是一个测试