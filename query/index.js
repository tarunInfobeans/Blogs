const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const postsById = {};

const hanldeEvent = (type, data) => {
    if(type === 'PostCreated'){
        const { id, title } = data;
        postsById[id] = {
            id,
            title,
            comment : []
        }
    }
    else if(type === 'CommentCreated'){
        const { postId, commentId, content, status} = data;
        const post = postsById[postId];
        post.comment.push({commentId,content, status});
        console.log(postsById[postId]);
    }
    else if(type === 'CommentUpdated'){
        const { postId, commentId, content, status} = data;
        const post = postsById[postId];
        const commentToBeChanged = post.comment.find(val => {
            return val.commentId===commentId
        });
        commentToBeChanged.content = content;
        commentToBeChanged.status = status;
    }
}

app.post('/events', (req,res) => {
    console.log('event received', req.body.type);
    
    hanldeEvent(req.body.type,req.body.data);
    
    res.send({status:'OK'});
});

app.get('/posts',(req,res) => {
    res.status(200).send(postsById);
});

app.listen(4002, async () => {
    console.log('listening for request in query service');
    try{
        const res = await axios.get('http://event-bus-srv:4005/events');
        res.data.forEach(event => {
            hanldeEvent(event.type, event.data);
        }); 
    }
    catch(err){
        console.log(err.message);
    }
})