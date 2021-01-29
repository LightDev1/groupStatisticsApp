const fs = require('fs');

const save = (obj) => {
    fs.writeFile('posts.json', JSON.stringify(obj), (err) => {
        if (err) {
            throw err;
        }
        console.log('Файл сохранен');
    });
};

module.exports = save;