/*
    模块
        fs:读取文件
        http:开启http服务
        path:生成绝对路径
*/
// 模块导入
const fs = require('fs');
const http = require('http');
const path = require('path');

// 记录网站根目录
let rootPath = path.join(__dirname,'www'); // console.log(rootPath);

// 创建服务器
let server = http.createServer((request,response)=>{
    response.end('hello');
})

// 开启服务器(监听)
server.listen(8848,'127.0.0.1',()=>{
    console.log('开启成功');
})
