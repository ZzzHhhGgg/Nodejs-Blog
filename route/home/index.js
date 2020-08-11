const { Article } = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {

    const page=req.query.page
    //查询数据库数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    res.render('home/default', {
        result: result
    });
}