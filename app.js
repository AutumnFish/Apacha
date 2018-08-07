/*
    模块
        fs:读取文件
        http:开启http服务
        path:生成绝对路径
*/
// 模块导入
const fs = require("fs");
const http = require("http");
const path = require("path");

// 记录网站根目录 
let rootPath = path.join(__dirname, "www"); // console.log(rootPath);

// 创建服务器
let server = http.createServer((request, response) => {
  // 生成地址
  let targetPath = path.join(rootPath, request.url); // console.log(targetPath);
  // 判断路径是否存在
  // 存在
  if (fs.existsSync(targetPath)) {
    // 文件 还是文件夹
    fs.stat(targetPath,(err,stats)=>{
        // 是文件 直接读取 并返回
        if(stats.isFile()){
            fs.readFile(targetPath,(err,data)=>{
                // 数据才读取完毕
                response.end(data);
            })
        }
        // 是文件夹 渲染出列表
    });
  }
  // 不存在 404
  else {
    // 只能设置头 不能设置 状态码
    response.statusCode = 404;
    response.setHeader("content-type", "text/html;charset=utf-8");
    response.end(`
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
            </body></html>
        `);
  }
});

// 开启服务器(监听)
server.listen(8848, "127.0.0.1", () => {
  console.log("开启成功");
});
