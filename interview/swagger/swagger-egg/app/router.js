module.exports = function(app) { //app就相当于koa的ctx,只不过是整个app
    app.router.get('/', 'home.index') //egg.js帮我们做了命名空间
    // app.router.get('/', 'home.index') //会去controller层找home.index
}