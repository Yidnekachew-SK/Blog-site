function PostCard({post}) {
    return(
        <div id={post.id}>
            <p>{post.title}</p>
            <p>{post.article}</p>
            <p>{post.createdAt}</p>
        </div>
    )
}

export default PostCard