const CommentList =  ({ comments }) => {

    return (
        <ul>
            {comments.map(comment => {
                let content;
                if(comment.status==='Approved')
                    content=comment.content;
                else if(comment.status==='Rejected')
                    content='This comment is rejected';
                else
                {
                    content='This comment is awaiting moderation';
                }
                return (
                <li key={comment.commentId}>
                    {content}
                </li>
            )})}
        </ul>
    )
}

export default CommentList;