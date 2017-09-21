const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


app.use('/', express.static(path.resolve(__dirname, '../src')));

app.get('/data', (req, res) => {
    let num = Math.random() * 100 | 0;

    res.status(200).send({count: num});
});

app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log(`Server started at ${PORT}`);
});

