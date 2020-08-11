//导入文章集合
const { Article } = require('../../model/article');
//导入mongoose-sex-page模板
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    //接收客户端传递的数据
    const page = req.query.page;
    //文章页面标识
    req.app.locals.currentLink = 'article';
    //查询所有文章数据
    //page指定当前页
    //size指定每页显示的数据条数
    //display指定客户端要显示的页码数量
    //exec向数据库发送查询请求
    let articles = await pagination(Article).find({}).page(page).size(2).display(3).populate('author').exec();
    // res.send(articles);
    // console.log(articles);
    res.render('admin/article.art', {
        articles: articles
    });
}