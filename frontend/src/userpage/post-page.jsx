import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Comment from "../components/comment";
import CommentForm from "../components/commentForm";
import Nav from "../components/nav";

function PostDetail() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [displayForm, setDisplayForm] = useState(false);

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
                throw new Error("Failed to fetch the post");
            }

            const data = await response.json();
            setPost(data);
        } catch (err) {
            setError(err.message);
        }
        })();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading post...</p>;

    return(
        <>
        <Nav isLoggedIn={isLoggedIn} setUser={setUser}/>
        <div className="postDisplayer">
            <div className="postSection">
                <h2>{post.title}</h2>
                <p>Created At: {post.createdAt}</p>
                <p>{post.article}</p>
            </div>

            {!isLoggedIn ? <p>Login to see comments</p> :
                <div>
                    <div>
                        <h3>Comments</h3>
                        <button type="button" onClick={() => setDisplayForm(true)}>Add comment</button>
                    </div>
                    {displayForm && 
                        <CommentForm userId={user.id} postId={Number(id)} setDisplayForm={setDisplayForm}/>
                    }
                    <div className="commentSection">
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