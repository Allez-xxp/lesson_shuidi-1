// 还要声明这两个是插件。他才会插进去服务中应用
exports.swaggerdoc = {
    enable: true,   // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
};

// 配置 egg-sequelize 插件信息。
exports.sequelize = {
    enable: true, // 是否启用。
    package: 'egg-sequelize', // 指定包名称。
};