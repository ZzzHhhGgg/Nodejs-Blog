const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    // res.send(req.query.id);
    //根据id删除用户
    // res.send('ok')
    await Article.findOneAndDelete({
        _id: req.query.id
    });
    res.redirect('/admin/article');
}