const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //获取到地址栏中的id参数
    const { message, id } = req.query;
    //如果id为真为修改操作否则为添加操作
    if (id) {
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

}