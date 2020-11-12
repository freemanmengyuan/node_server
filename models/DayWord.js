const db = require('../dao/db');

module.exports = db.defineModel('day_word', {
    content: {
        type: db.STRING(500),
        unique: true
    },
    author: db.STRING(100),
    status: db.INTEGER
});