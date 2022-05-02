import { useState } from "react";
import axios from 'axios';

const CreatePost = () => {

    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://posts.com/posts/create',{
            title
        })
        setTitle('');
        window.location.reload();
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputTitle" style={{margin:'20px'}}>ADD YOUR POST TITLE</label>
                <input 
                    type="text" 
                    id="inputTitle" style={{width:'50%',height:'30px',fontSize:'20px'}}
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}/>
            </form>
        </div>
    )
}

export default CreatePost;