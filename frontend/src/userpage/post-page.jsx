import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import Comment from "../components/comment";
import CommentForm from "../components/commentForm";
import Nav from "../components/nav";
import '../styles/user styles/postpage-styles.css';

function PostDetail() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [displayForm, setDisplayForm] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const {isLoggedIn, user, setUser} = useOutletContext();

    useEffect(() => {
        const token = localStorage.getItem("token");
        (async () => {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!response.ok) {
                if (user === null) {
                    navigate("/login");
                }
                throw new Error("Failed to fetch the post");
            }

            const data = await response.json();
            setPost(data);
        } catch (err) {
            setError(err.message);
        }
        })();
    }, [id, hasChanged]);

    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading post...</p>;
    const formatedDate = format(new Date(post?.createdAt), "MMM dd,yyyy hh:mm a");

    return(
        <>
        <Nav isLoggedIn={isLoggedIn} setUser={setUser}/>
        <div className="postDisplayer">
            <div className="postSection">
                <h2 className="blogHeader">{post.title}</h2>
                <p className="blogDate">Created At: {formatedDate}</p>
                <p className="blogArticle">{post.article}</p>
            </div>

            {!isLoggedIn ? <p>Login to see comments</p> :
                <div className="commentSection">
                    <div className="headerSection">
                        <h3 className="commentHeader">Comments</h3>
                        <button type="button" className="addCommentButton" onClick={() => setDisplayForm(true)}>Add comment</button>
                    </div>
                    {displayForm && 
                        <CommentForm userId={user.id} postId={Number(id)} setDisplayForm={setDisplayForm} setHasChanged={setHasChanged} />
                    }
                    <div className="userComments">
                        {post?.comments?.map((comment) => (
                            <Comment key={comment.id} comment={comment} user={user} />
                        ))}
                    </div>
                </div>
            }
        </div>
        </>
    )
}

export default PostDetail