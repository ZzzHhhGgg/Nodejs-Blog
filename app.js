//引用express框架
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser
const bodyParser = require('body-parser');
//导入express-session
const session = require('express-session');
//引用dataformat模块
const dateFormat = require('dateformat');
//导入morgan第三方模块
const morgan = require('morgan');
//导入config模块
const config = require('config');
//导入art-template
const template = require('art-template');
//创建网站服务器
const app = express();

//引入数据库连接文件
require('./model/connect');
//处理post请求参数
//extened: false 用querystring处理请求参数
//extened: true 用qs处理请求参数
app.use(bodyParser.urlencoded({ extended: false }));
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    //cookie过期时间
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

//告诉express框架使用什么模板引擎渲染什么后缀的文件
app.engine('art', require('express-art-template'));
//告诉express框架模板放在什么位置
app.set('views', path.join(__dirname, 'views'));
//告诉框架模板默认后缀是什么
app.set('view engine', 'art');

//向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'));

if (process.env.NODE_ENV == 'development') {
    //开发环境
    //在开发环境中将客户端发送到服务器的信息打印在控制台
    app.use(morgan('dev'))
} else {
    //生产环境
}

//导入路由
const home = require('./route/home');
const admin = require('./route/admin');
const { nextTick } = require('process');
//拦截请求，判断用户是否登录
app.use('/admin', require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    return res.redirect(`${result.path}?${params.join('&')}`);
});

//监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');