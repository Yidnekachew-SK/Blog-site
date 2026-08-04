function Comment({comment, user}) {
    return(
        <div>
            <p>{user.username}</p>
            <p>{comment.comment}</p>
            <p>{comment.likes}</p>
        </div>
    )
}

export default Comment