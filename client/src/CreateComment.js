import axios from 'axios';
import { useState } from 'react';

const CreateComment = ({postId}) => {
    const [comment, setComment] = useState('');

    const hanldeSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`,{
            content:comment
        }).then(res => {
            console.log(res.data);
        })
        setComment('');
        window.location.reload();
    }

    return(
        <div>
            <form onSubmit={hanldeSubmit}>
                <label htmlFor={postId}>Comment ::</label>
                <input 
                    type="text" 
                    value={comment} 
                    onChange={e => setComment(e.target.value)}
                    style={{border:'2px solid lightBlue',margin:'2px'}}
                    id={postId}/>
            </form>
        </div>
    )
}

export default CreateComment;