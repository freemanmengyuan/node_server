const model = require('../dao/model');
let Pet = model.Pet

// 列表
var pets = async (ctx, next) => {
    // var name = ctx.params.name;
    var pets = await Pet.findAll()
    ctx.response.body = pets
};

// 新增
var add = async (ctx, next) => {
    var pet = await Pet.create({
        ownerId: '28e6c847-da09-4451-b855-5c98b4be50dc',
        name: 'john',
        gender: false,
        birth: '2019-09-08'
    })
    const result = {
        err: 0,
        msg: 'success',
        data: pet
    }
    ctx.response.body = result
}

module.exports = {
    'GET /pet/list': pets,
    'GET /pet/add': add
};