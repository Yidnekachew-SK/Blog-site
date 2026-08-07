import '../styles/user styles/postpage-styles.css';

function Comment({comment, user}) {
    return(
        <div className='commentCard'>
            <p className='user'>{user.username}</p>
            <p>{comment.comment}</p>
        </div>
    )
}

export default Comment