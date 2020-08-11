const { User } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    //接收客户端传递的请求参数
    const { name, email, role, state, password } = req.body;
    //即将要修改的用户id
    const id = req.query.id;
    let user = await User.findOne({ _id: id });
    //密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        //密码比对成功
        await User.updateOne({ _id: id }, { name: name, email: email, role: role, state: state });

        //更新用户信息后重定向到用户列表
        res.redirect('/admin/user');
    } else {
        //密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能修改用户信息', id: id }
        next(JSON.stringify(obj));
    }
}