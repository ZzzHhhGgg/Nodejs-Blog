const { User } = require('../../model/user');
module.exports = async(req, res) => {
    //添加标识
    req.app.locals.currentLink = 'user';
    //接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    //每页显示条数
    let pagesize = 10;
    //查询用户总数User.countDocuments({})
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pagesize);

    //每页对应开始查询的位置
    let start = (page - 1) * pagesize;

    //将用户信息查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    // res.send(users);
    //渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
}