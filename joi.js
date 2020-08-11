//引入joi模块
const Joi = require('joi');

//定义对象的验证规则
const schema = {
    name: Joi.string().min(2).max(5).required().error(new Error('name属性没有通过验证')),
    brith: Joi.number().min(1990).max(2020).error(new Error('brith没有通过验证'))
};



async function run() {
    try {
        //实施验证
        await Joi.validate({
            name: 'ab',
            brith: 1800
        }, schema);
    } catch (error) {
        console.log(error.message);
        return;
    }
    console.log('验证通过');

}
run();