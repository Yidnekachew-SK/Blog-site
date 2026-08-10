import { Link } from "react-router-dom";
import { format } from 'date-fns';
import '../styles/user styles/homepage-styles.css';

function PostCard({post, isAdmin}) {
    const formatedDate = format(new Date(post.createdAt), "MMM dd,yyyy hh:mm a");
    return(
        <div id={post.id} className="postCard">
            <p className="blogTitle">{post.title}</p>
            <div className="blogParagraph" dangerouslySetInnerHTML={{ __html: post.article }} />
            <p className="blogDate">{formatedDate}</p>
            {isAdmin === true ? 
                <Link to={`/admin/post/${post.id}`} className="blogLink">Open</Link> :
                <Link to={`/post-detail/${post.id}`} className="blogLink">Open</Link> 
            }
        </div>
    )
}

export default PostCard