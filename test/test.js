/*
 * @Description: 测试方法
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-03-27
 * @LastEditTime: 2019-03-28
 */
const path = require('path');
//工具方法
const execute = require("../src/index");
// 请求
const apis = require("./api.config");
const conf = {
  cookie: "",
  host: "",
  filePath: path.resolve(__dirname, "../data/")
};

(async () => {
  let temp = [];
  for (let api in apis) {
    await execute({
      path: apis[api],
      cookie: conf.cookie,
      host: conf.host,
      filePath: conf.filePath,
      fileName: api
    }).then((res) => {
      // console.log("==========正在写文件", res);
    }).catch((err) => {
      temp.push(api)
      console.log("==========异常捕获", api, err);
    })
  }
  console.log("有问题的api，请关注：", temp);
})()