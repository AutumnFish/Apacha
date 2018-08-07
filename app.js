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

// 引入第三方模块 npm下载的
const mime = require("mime");

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
    fs.stat(targetPath, (err, stats) => {
      // 是文件 直接读取 并返回
      if (stats.isFile()) {
        // 测试代码
        // 使用mime设置类型
        response.setHeader("content-type", mime.getType(targetPath));
        // 读取文件并返回
        fs.readFile(targetPath, (err, data) => {
          // 数据才读取完毕
          response.end(data);
        });
      }
      // 是文件夹 渲染出列表
      if (stats.isDirectory()) {
        // console.log(request.url);
        
        // 读取文件夹信息
        fs.readdir(targetPath, (err, files) => {
          let tem = '';
        //   console.log(request.url);
          // 遍历
          for (let i = 0; i < files.length; i++) {
            tem+=`
            <li>
                <a href="${request.url}${request.url=='/'?'':'/'}${files[i]}">${files[i]}</a>
            </li>
            `
          }
          // 读取完毕之后再返回
          response.end(`
          <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
              <html>
              
              <head>
                  <title>Index of/ </title>
              </head>
              
              <body>
                  <h1>Index of ${request.url}</h1>
                  <ul>
                      ${tem}
                  </ul>
              </body>
              
              </html>
          `);
        });

       
      }
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
