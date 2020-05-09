// TDD测试驱动开发！！ 敏捷开发强调的一种开发模式 会让写代码写的很快 
// TS其实也是一种敏捷开发 因为他有错误机制，让之后的调bug变的更少
// 先写测试代码，再写实现的业务代码。 mocha这个工具套件就是提供这种编写的方式
// mocha组织测试工作 should提供测试语义

// 3.1 EaseDate我们的待测试的代码 
const EaseDate = require('../../src/EasyDate')
// 3.3 断言库
const should = require('should')
// 1.说下要测试什么 打开测试 这个区块提供要测试的,放所有的it测试用例
describe('想要测试Date合格',()=>{ //要测试一个日期类,会在mocha这个工作套件运行后面的这个函数 
    // 添加测试用例
    // 举个例子
    // 3. EaseDate 简单的日期类 是个底层的类
    // let date = new EaseDate();
    // 6.1高级需求，可以给一个在当前日期后的偏移量，希望这个类支持这种写法：
    let date = new EaseDate('+1m'); //多加一个月，m是month

    // 2. it就像大单元中的小单元，测试用例写这里，每种测试写一个it
    it("测试实例，日期正确！", () => {
        // 测试，来生成一个日期，怎么判断生成的实例是一个合格的日期？
        // 现在就能在这里写测试代码，也就是能用上业务代码也就是src下的代码，测试未来写的代码是否正确
        // 开始写test目录的代码
        // 3.2
        // date.getFullYear()
        let some = date.toDate() //是我们写的一个方法
        let today = new Date() //是一个当前的日期对象 可以通过测试的
        should(some.getFullYear()).equal(today.getFullYear()) //equal是should这个断言库一个JS的库提供的一个方法
        // toDate没有返回一个可以使用getFullYear的，所以会报错，所以要去补完
        // 6
        should(some.getMonth()).equal(today.getMonth());
        should(some.getMonth()).equal(today.getMonth() + 1); //6.1希望equal的是加一个月的
    })
    // 4 围绕着日期需求再测试一个
    // 又做一个分组describe
    // 因为是对一个单独的static方法，所以放在新的describe，但又是日期型的，所以在里面
    describe('判断闰年', () => {
        // 进入实例组
        it('是否为闰年', () => {
            should(EaseDate.isLeapYear(2000)).be.True();  //同样也要去做这个方法 是个静态方法，可以直接通过类名调用的
            // 为啥要用静态方法，不用实例化就能直接判断的，如果是对象的方法，就要先实例化，会更麻烦。 再测试一下npm run test
        })
    })
    // 5 月份 
    describe('月份',() => {
        it('输出月份，个位数前面自动补0', () => {
            should(EaseDate.toDouble(11)).equal('11');
            should(EaseDate.toDouble(9)).equal('09');
        })
    })
}) 
