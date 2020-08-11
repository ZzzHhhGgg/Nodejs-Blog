//导入用户集合构造函数
const {
    User
} = require('../../model/user');
//导入bcrypt
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    const {
        email,
        password
    } = req.body;
    /* if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).send('<h4>邮箱或者密码输入错误</h4>')
    } */
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {
            msg: '邮箱或者密码错误'
        });
    }
    //根据邮箱查询用户
    let user = await User.findOne({
        email: email
    });
    //查询到了用户
    if (user) {
        //将客户端密码与服务端存的密码相比较
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            //登录成功
            //http协议需通过session和cookie去进行客户端和服务端交互
            req.session.username = user.name;
            //角色存储
            req.session.role=user.role;
            // res.send('登录成功')
            req.app.locals.userInfo = user;
            //判断角色，决定跳转页面
            if(user.role=='admin'){
                //express中的重定向
                res.redirect('/admin/user');
            }else{
                res.redirect('/home/');
            }
            
        } else {
            //没查询到用户
            res.status(400).render('admin/error', {
                msg: '邮箱地址或密码错误'
            });
        }
    } else {
        //没查询到用户
        res.status(400).render('admin/error', {
            msg: '邮箱地址或密码错误'
        });
    }
}