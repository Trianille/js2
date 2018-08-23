const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const cors = require('cors');

//Access-Control-Request-Method: GET, POST

const port = 3000;
app.use(cors());


app.get('/', (request, response) => {
    response.send('Hello!');
});

app.post('/review.add', (request, response) => {
    const data = (fs.readFileSync(path.join(__dirname, 'review.add.json'), 'utf8'));
    response.send(data);
});

app.post('/review.submit', (request, response) => {
    const data = (fs.readFileSync(path.join(__dirname, 'review.submit.json'), 'utf8'));
    response.send(data);
});

app.post('/review.delete', (request, response) => {
    const data = (fs.readFileSync(path.join(__dirname, 'review.delete.json'), 'utf8'));
    response.send(data);
});

app.post('/review.list', (request, response) => {
    const data = (fs.readFileSync(path.join(__dirname, 'review.list.json'), 'utf8'));
    response.send(data);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    const data = (fs.readFileSync(path.join(__dirname, 'error.json'), 'utf8'));
    res.status(500).send(data);
});


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log('server is listening on ', port);
});
