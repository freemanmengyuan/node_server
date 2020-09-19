const model = require('../dao/model');
let User = model.User

// 用户列表
var users = async (ctx, next) => {
    // var name = ctx.params.name;
    var users = await User.findAll()
    ctx.response.body = users
};

// 新增用户
var add = async (ctx, next) => {
    var user = await User.create({
        name: 'tom',
        gender: false,
        email: 'tom-' + Date.now() + '@garfield.pet',
        passwd: '123456'
    });
    const result = {
        err: 0,
        msg: 'success',
        data: user 
    }
    ctx.response.body = result;
}

module.exports = {
    'GET /user/list': users,
    'GET /user/add': add
};