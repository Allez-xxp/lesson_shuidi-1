// 在这里覆盖掉之前的默认配置
const { override } = require('customize-cra');

function addRendererTarget(config) {
    config.target = 'electron-renderer' //当electron在react中渲染的时候让它支持import方式搞定
    return config
}
module.exports = override(addRendererTarget)