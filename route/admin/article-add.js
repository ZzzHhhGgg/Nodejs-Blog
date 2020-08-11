//引入formidable
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //设置上传文件路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    //保留上传文件后缀
    form.keepExtensions = true;
    //解析表单
    form.parse(req, async(err, fields, files) => {
        //err为错误对象，解析失败，err有内容，否则为空
        //fields对象类型 保存普通表单数据
        //files 对象类型  保存二进制文件上传数据
        // files.cover.path.split('public')[1];
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        //数据添加完成后重定向文章列表页面
        res.redirect('/admin/article');
    });

}