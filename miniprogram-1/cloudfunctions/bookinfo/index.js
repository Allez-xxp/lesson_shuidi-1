var cloud = require('wx-server-sdk'); //云服务器

var rp = require('request-promise');  // npm 向API发出请求

cloud.init();

exports.main = async (event, context) => {
  console.log(`http://feedback.api.juhe.cn/ISBN?sub=${event.isbn}&key=c484c33f8b8846944309abb9738b633e`);
  var res = rp(`http://feedback.api.juhe.cn/ISBN?sub=${event.isbn}&key=c484c33f8b8846944309abb9738b633e`).then(html => {
    return html;
  })
  return res;
}