//导入bcrypt
const bcrypt = require('bcrypt');

async function run() {
    //生成随机字符串
    //genSalt方法接收一个数值为参数
    //数值越大，生成的随机字符串复杂度越高
    //数值越小，生成的随机字符串复制度越低
    //默认为10
    const salt = await bcrypt.genSalt(10);
    //对密码进行加密
    //第一个参数为加密的明文，第二个参数为随机字符串
    //返回值为加密的密码
    const result = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(result);
}
run();