const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req,res) => {
    console.log('request received',req.body.type);
    const {type,data} = req.body;
    if( type === "CommentCreated" ){
        const status = data.content.includes('orange')?"Rejected":"Approved";
        console.log(status);
        axios.post('http://event-bus-srv:4005/events',{
            type : 'CommentModerated',
            data : {
                postId : data.postId,
                commentId : data.commentId,
                content : data.content,
                status
            } 
        })
    }
    
    res.send({});
});

app.listen(4003,() => {
    console.log('listening for requests in moderation service');
});