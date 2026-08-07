import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/user styles/postpage-styles.css';

function CommentForm({userId, postId, setDisplayForm, setHasChanged}) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleAddComment = async function(e) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/post/${postId}/comment`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ comment }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return
            }
            
            if (response.ok) {
                setDisplayForm(false);
                setHasChanged(prev => !prev);
                }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="addCommentSection">
            {error && 
                <p className="error">{error}</p>
            }
            <form onSubmit={handleAddComment} className="addCommentForm">
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="comment" cols={30} rows={5}
                    value={comment} onChange={(e) => setComment(e.target.value)} required>
                </textarea>

                <div className="formButtons">
                    <button type="button" onClick={() => setDisplayForm(false)}>Cancel</button>
                    <button type="submit">Add Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm