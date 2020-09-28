/**
 * 初始化表结构
 */
const model = require('./dao/model.js');
model.sync();

console.log('init db ok.');