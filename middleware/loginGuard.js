const guard = (req, res, next) => {
    //登录状态，继续往下
    //不是登录，重定向登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        if(req.session.role=='normal'){
            return res.redirect('/home/');
        }
        next()
    }

}
module.exports = guard;