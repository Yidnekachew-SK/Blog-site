import { Link } from "react-router-dom";

function PostCard({post, isAdmin}) {
    return(
        <div id={post.id} className="postCard">
            <p>{post.title}</p>
            <p>{post.article}</p>
            <p>{post.createdAt}</p>
            {isAdmin === true ? 
                <Link to={`/admin/post/${post.id}`}>Open</Link> :
                <Link to={`/post-detail/${post.id}`}>Open</Link> 
            }
        </div>
    )
}

export default PostCard