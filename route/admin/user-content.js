const {User}= require('../../model/user');
module.exports=async(req,res)=>{
    const id = req.query.id.replace(/"/g,'');
    let user=await User.findOne({_id:id});
    // res.send(user);
    res.render('admin/user-edit',{
        user: user,
        button:'修改'
    });
}