const express = require('express');
const cors = require('cors')
const parsePosts = require('./scrapper/index');

const app = express();

app.use(express.json())
app.use(cors());

app.post('/api/posts', async (req, res) => {
    try {
        const { link, count } = req.body;

        const posts = await parsePosts(link, count);
        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

const PORT = 5000;

app.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`Сервер запущен на порте ${PORT}`);
});