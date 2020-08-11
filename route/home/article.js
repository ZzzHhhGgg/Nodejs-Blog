//导入文章集合
const{ Article} = require('../../model/article');
//导入评论集合构造函数
const {Comment} = require('../../model/comment');

module.exports = async(req, res) => {
    //接收文章id
    const id = req.query.id;
    //根据id查询
    let article = await Article.findOne({_id:id}).populate('author');
    //查询文章所对应的评论信息
    let comments = await Comment.find({aid:id}).populate('uid');
    // console.log(article);
    // res.send(comments);
    // res.send('欢迎来到博客首页')
    res.render('home/article',{
        article:article,
        comments:comments
    })
}