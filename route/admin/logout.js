module.exports = (req, res) => {
    //删除session
    req.session.destroy(function() {
        //删除cookie
        res.clearCookie('connect.sid');
        //重定向
        res.redirect('/admin/login');
        //清楚模板用户信息
        req.app.locals.userInfo='';
    });
}