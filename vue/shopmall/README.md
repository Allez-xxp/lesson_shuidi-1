- 组件延迟加载
考点，性能优化，首页不需要加载那么多，返回引入组件的函数
- alias
vue里面相对地址查找的时候 复杂的项目，一定是有架构的，目录结构。
alias来自webpack build配置，可以定义
@   代表src,
~   代表src/asserts
还可以定义别的，自定义。
在template目录里，加载静态资源，用别名的绝对路径都要在前面加一个~

classin