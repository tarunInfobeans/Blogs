const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsById = {};

app.post('/posts/create', async (req,res) => {
    const id = randomBytes(4).toString('hex');
    postsById [id] = {
        id,
        title:req.body.title
    }
    console.log(postsById[id]);

    await axios.post('http://event-bus-srv:4005/events',{
        type : 'PostCreated',
        data : postsById[id]
    })

    res.send({ status:'OK' })
});

app.get('/posts', (req,res) => {
    console.log('get req. made');
    res.status(200).send(postsById);
});

app.post('/events', (req,res) => {
    console.log('request received', req.body.type);
    res.send({status:'OK'});
});

app.listen(4000, () => {
    console.log('latest version');
    console.log('listening for request 1..2...3....');
});