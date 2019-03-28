/*
 * @Description: 请求远端数据，生成JSON文件，提供前端mock数据
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-03-27
 * @LastEditTime: 2019-03-28
 */
const fs = require('fs'); // 载入fs模块
const path = require('path');
const http = require('http');




/**
 * @Description: 接受处理入口
 * @param {Object} config  配置请求入口 host | path | method | cookie | filePath| fileName
 * @param {Function} cb    请求处理成功回调
 * @param {Function} err    
 * @return: 
 */
async function execute(config) {
  await CreateDirectory(config.filePath);
  return await new Promise((resolve, reject) => {
    Request(config).then((res) => {
      console.log("2.请求成功，准备开始写文件~");
      WriteFile(res, config.filePath, config.fileName).then((res) => {
        resolve(res);
      }).catch((res) => {
        reject(res);
      })
    }).catch((res) => {
      reject(res);
    });
  })

}
/**
 * @Description: 请求数据
 * @param {config} host | path | method | cookie
 * @return: Promise
 */
function Request(config) {
  const options = {
    host: config.host,
    path: config.path,
    method: config.method || "get",
    headers: {
      "Content-Type": "application/json",
      Cookie: config.cookie
    }
  };

  return new Promise((resolve, reject) => {
    let rawData = '';
    console.log("1.请求地址：",
      config.path)
    var req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          resolve(rawData);
        } catch (e) {
          reject(e);
          console.error('-----error-------', e.message);
        }
      });
      res.on('error', function (e) {
        // TODO: handle error.
        reject(e);
        console.log('-----error-------', e);
      });
    })
    req.end();
  })

}

function WriteFile(data, filePath, fileName) {
  return new Promise((resolve, reject) => {
    let temp = {};
    try {
      temp[fileName] = JSON.parse(data);
      let location = path.resolve(__dirname, filePath, `${fileName}.json`);
      console.log("3.文件开始写入");
      fs.writeFile(location, JSON.stringify(temp), {
        encoding: 'utf-8'
      }, (err) => {
        
        if (err) {
          reject(err);
          throw err;
        }
        console.log("4.文件写入成功");
        resolve("文件写入成功~");
      })
    } catch (e) {
      console.log(data)
      reject(e);
    }
  })
}

/**
 * @Description: 检索
 * @param {type} 
 * @return: 
 */
function CreateDirectory(filePath) {
  let location = path.resolve(__dirname, filePath);
  fs.stat(location, (err) => {
    if (err) {
      fs.mkdir(location, (err) => {
        if (err) {
          throw err;
        }
      })
    }
  })
}

module.exports = execute;