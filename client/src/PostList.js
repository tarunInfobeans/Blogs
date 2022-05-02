import axios from 'axios';
import { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const PostList = () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        await axios.get('http://posts.com/posts')
            .then(res =>{
                console.log(res.data);
                setPosts(res.data);
            })
    }

    useEffect(() => {
        fetchPosts();
    },[])

    return (
        <div>
            {Object.values(posts).map(post => {
                return (
                    <div key={post.id} style={{border:'1px solid',borderRadius:'5px',margin:'10px',padding:'5px'}}>
                        <h3 style={{textAlign:'center',margin:'0'}}>{post.title}</h3>
                        <CommentList comments={post.comment}/>
                        <CreateComment postId={post.id}/>
                    </div>
                )
            })}
        </div>
    )
}

export default PostList;