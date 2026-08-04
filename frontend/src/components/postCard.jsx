import { Link } from "react-router-dom";

function PostCard({post}) {
    return(
        <div id={post.id} className="postCard">
            <p>{post.title}</p>
            <p>{post.article}</p>
            <p>{post.createdAt}</p>
            <Link to={`/post-detail/${post.id}`}>Open</Link>
        </div>
    )
}

export default PostCard