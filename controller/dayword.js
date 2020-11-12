const model = require('../dao/model');
let DayWord = model.DayWord

// 列表
var days = async (ctx, next) => {
    // var name = ctx.params.name;
    var days = await DayWord.findAll()
    const result = {
        err: 0,
        msg: 'success',
        data: days
    }
    ctx.response.body = result
};

// 新增
var add = async (ctx, next) => {
    var dayword = await DayWord.create({
        content: '我本将心向明月，奈何明月照沟渠',
        status: 1,
        author: 'mengyuan'
    })
    const result = {
        err: 0,
        msg: 'success',
        data: dayword
    }
    ctx.response.body = result
}

// 随机取出
var rand = async (ctx, next) => {
    // var name = ctx.params.name;
    var days = await DayWord.findAll();
    // console.log(1111, days[0])
    var date = new Date();
    var wNum = date.getDay();
    const result = {
        err: 0,
        msg: 'success',
        data: days[wNum - 2]
    }
    ctx.response.body = result
};

module.exports = {
    'GET /dayword/list': days,
    'GET /dayword/add': add,
    'GET /dayword/rand': rand
};