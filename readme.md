### mock-shell

**开发的过程中是否遇到过本地的模拟数据不够多，不够新的问题，mock-shell 可以帮您解决这个问题（仅限`GET`请求数据）。**

参考 test 目录下的 test.js 文件，写一个同步请求线上数据生成`json`文件

```javascript
npm install -D mock-shell

const execute = require("mock-shell");

// 执行示例
execute({
  path: "",             //线上接口地址
  cookie: "",           //可能登录受限，需要携带cookie进行请求
  host: "",             //服务的域名
  filePath: "",         //文件存放的路径，绝对路径，path解析过的。
  fileName: ""          //生成的文件名字
}).then((res) => {
  // console.log("==========正在写文件", res);
}).catch((err) => {
  console.log("==========异常捕获", api, err);
})
```

demo中展示的批量请求时的操作，还可以检测API是否可用

目前只是解决了我遇到的问题，有问题的话可以联系我，持续改进(askfuture1234@gmail.com)。