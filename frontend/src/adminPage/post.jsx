import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Comment from "../components/comment";
import Nav from "../components/nav";

function AdminPostDetail() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const token = localStorage.getItem("token");

    const {isLoggedIn, user, setUser} = useOutletContext();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
        try {
            const response = await fetch(`/api/posts/${id}`, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the posts");
            }

            const data = await response.json();
            setPost(data);
            setHasChanged(false);
        } catch (err) {
            setError(err.message);
        }
        })();
    }, [hasChanged]);

    const HandlePostDelete = async function(postId) {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

           navigate("/admin");
        } catch (err) {
            setError(err.message);
        }
    }

    const HandlePostPublish = async function(postId) {
        let status = post.status === "published" ? "unpublished" : "published";

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({status}),
            });

            if (!response.ok) {
                throw new Error("Failed to update post");
            }

            setHasChanged(true);
        } catch (err) {
            setError(err.message);
        }
    }

    const HandleCommentDelete = async function(commentId, postId) {
        try {
            const response = await fetch(`/api/post/${postId}/comment/${commentId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            const data = await response.json();
            setHasChanged(false);
        } catch (err) {
            setError(err.message);
        }
    }

    if (user?.role != "Admin") return <p>Not Authorized</p>
    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading posts...</p>;

    return(
        <>
        <Nav isLoggedIn={isLoggedIn} setUser={setUser}/>
        <div className="postContainer">
            <div className="postSection">
                <div>
                    <div>
                        <button type="button" key={`publish-${post.id}`} onClick={() => HandlePostPublish(post.id)}>{post.status === "published" ? "unpublish" : "publish"}</button>
                        <button type="button" key={`delete-${post.id}`} onClick={() => HandlePostDelete(post.id)}>Delete</button>
                    </div>
                    <h2>{post.title}</h2>
                    <p>Created At: {post.createdAt}</p>
                    <p>{post.article}</p>
                </div>
            </div>

            <div>
                <h3>Comments</h3>
                <div className="commentSection">
                    {post?.comments?.map((comment) => (
                        <div key={`comment-container-${comment.id}`}>
                            <Comment key={comment.id} comment={comment} user={user} />
                            <button type="button" key={`button-${comment.id}`} onClick={() => HandleCommentDelete(comment.id, post.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
                
        </div>
        </>
    )
}

export default AdminPostDetail