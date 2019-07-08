## node.js + react + koa
## 命令
    安装依赖
    npm i

    创建项目
    npm run create xxx
        注: xxx 为项目路径名, 创建后项目位于projects/xxx下

    编译

    编译react npm run build:react
    编译项目 npm run build:xxx

    启动调试

    npm run start:xxx
        注： 需要在项目根目录./创建后项目位于projects/xxx/project.json 添加配置
        1. "xxx_redirect": "https://m.xxx.com", 添加跳转域名
        2. "port": "NNNN"  手动添加端口号 如：9527
    访问 0.0.0.0:NNNN

## 手动添加

    添加路由

    在./lib/render.jsx   import xxx_route from './../projects/xxx/routes/client'; 
    const routes = {
        xxx: xxx_route
    }
    添加命令 
    
    npm run build:xxx
    npm run start:xxx