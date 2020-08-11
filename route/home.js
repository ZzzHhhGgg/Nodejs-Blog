//引入express框架
const express = require('express');
//创建博客展示页面路由
const home = express.Router();


//博客前台首页展示页面
home.get('/', require('./home/index'));

//博客前台文章详情页面
home.get('/article', require('./home/article'));

//创建评论路由
home.post('/comment',require('./home/comment'));

//将路由对象作为模块导出
module.exports = home;