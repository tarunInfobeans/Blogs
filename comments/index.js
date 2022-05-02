const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');

const commentsByPostId = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts/:id/comments', async (req,res) => {
    
    commentId = randomBytes(4).toString('hex');
    comments = commentsByPostId[req.params.id] || [];
    comments.push({commentId,content:req.body.content,status:'pending'});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events',{
        type : 'CommentCreated',
        data : {
            postId : req.params.id,
            commentId,
            content : req.body.content,
            status : 'pending'
        }
    });

    res.status(200).send(commentsByPostId);
});

app.get('/posts/:id/comments', (req,res) => {
    console.log('get request made');
    res.send((commentsByPostId[req.params.id] || []));
});

app.post('/events', async (req,res) => {
    console.log('request received', req.body.type);
    const { type,data } = req.body;
    if(type === "CommentModerated"){
        const {postId, commentId, content, status} = data;
        console.log(data);
        console.log(commentsByPostId[postId]);
        const commentToBeChanged = commentsByPostId[postId].find(val => {
            return val.commentId === commentId;   
        })
        commentToBeChanged.status = status;
        
        await axios.post('http://event-bus-srv:4005/events',{
            type : 'CommentUpdated',
            data : {
                postId,
                commentId,
                content,
                status
            }
        })
    } 
    res.send({});
});

app.listen(4001,() => {
    console.log('listening for requests...');
})