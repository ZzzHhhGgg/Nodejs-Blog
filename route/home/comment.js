//导入品论集合导入
const {Comment} = require('../../model/comment');
module.exports=(req,res)=>{
    // res.send(req.body);
    const {content,uid,aid}=req.body;

    //存储评论信息
    Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    });
    // 重定向文章详情页
    res.redirect('/home/article?id='+aid);
}