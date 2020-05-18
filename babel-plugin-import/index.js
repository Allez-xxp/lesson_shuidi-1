// babel插件的规则
// 必须return一个方法，里面有一个要实现的东西：visitor
// 还会给一个形参，给我们babel中实现的工具函数 是一个babel-types库，是一个强大的处理AST结点的库，工具库
// 插件转化就是对这棵树进行增删改查
// parse会对这个树进行遍历，给了我们一个对代码执行的时机
module.exports = function(babelTypes) {
    const { types} = babelTypes;
    return {
        visitor: {
            // 参数是他给我们的
            // path这个变量告诉我们这个import这个结点的所有信息，opt就是配置 写一个配置看一下
            // 这条语句的类型 遇到导入的语句就这行这里的代码 要针对什么代码，就把代码的类型放过来
            ImportDeclaration(path, { opts }) { //遍历到这里就是一个执行的时机
                // 配一下环境，让插件跑起来，就是要能编译
                // console.log(path, opts);
                // 在该节点进行增删改查
                // 替换谁
                // babel用的babylon我们用这种的
                if(!path.node.specifiers[0].imported) return;
                const imported = path.node.specifiers[0].imported.name; //取到button
                // 然后进行拼接
                const source = path.node.source.value;//取到antd
                // 去一下local
                const local = path.node.specifiers[0].local
                // console.log(imported, source);
                // 对树进行修改
                // 替换 构造节点import Button from 'antd/Button'，用Button和antd构造出对应的节点
                // 这个语句对应的节点有： 用一个工具生成结构
                // source是一个字符串字面量不能直接写`antd/${imported}`，要生成一个stringLiteral
                let stringLiteral = types.stringLiteral(`${source}/${imported}`);
                // ES module的默认导入  里面需要一个local变量(未知的信息)，不过我们刚才里面已经有一个local的信息，我们复用一下
                let specifiers = types.ImportDefaultSpecifier(local)
                const node = types.importDeclaration([specifiers], stringLiteral)
                // 原来的节点不要了，替换掉生成的新的节点
                path.replaceWith(node); //某个节点把此时的节点替换掉
                
            },
            // path就代表这个节点，变量声明节点
            VariableDeclaration(path) {

            }
        }
    }
}