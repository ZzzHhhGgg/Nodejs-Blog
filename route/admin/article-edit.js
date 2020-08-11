const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //获取到地址栏中的id参数
    const { id } = req.query;
    //文章页面标识
    req.app.locals.currentLink = 'article';
    // res.render('admin/article-edit.art');
    //如果id为真为修改操作否则为添加操作
    if (id) {
        let article = await Article.findOne({
            _id: id
        });
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
}