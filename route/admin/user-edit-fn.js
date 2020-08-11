//引入用户集合
const {
    User,
    validateUser
} = require('../../model/user');
//导入bcrypt
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //添加标识
    req.app.locals.currentLink = 'user';
    try {
        await validateUser(req.body);
    } catch (error) {
        //验证没通过
        // error.message
        //重定向用户添加页面
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
        //JSON.stringify
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));
    }
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        // return res.redirect('/admin/user-edit?message=邮箱地址已占用');
        return next(JSON.stringify({
            path: '/admin/user-edit',
            message: '邮箱地址已占用'
        }));
    }
    //邮箱没被占用，先将密码加密，再存入数据库中
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    //替换加密密码
    req.body.password = password;
    //信息加入数据库
    await User.create(req.body);
    //添加完成重定向到用户列表
    res.redirect('/admin/user');
}