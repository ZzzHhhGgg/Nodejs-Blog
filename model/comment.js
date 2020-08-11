//引入mongoose模块
const mongoose = require('mongoose');
//创建评论集合规则
const commentSchaema = new mongoose.Schema({
    //文章id
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    //用户id    
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //评论时间
    time:{
        type:Date
    },
    //评论内容
    content:{
        type:String
    }
});

const Comment= mongoose.model('Comment',commentSchaema);

//将评论集合导出
module.exports = {
    Comment:Comment
}