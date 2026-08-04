import { useState } from "react";

function CommentForm({userId, postId, setDisplayForm}) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const handleAddComment = async function(e) {
        e.preventDefault();

        try {
            const response = await fetch(`/api/post/${postId}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment, userId, postId }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {error && 
                <p>{error}</p>
            }
            <form onSubmit={handleAddComment}>
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="comment" cols={30} rows={5}
                    value={comment} onChange={(e) => setComment(e.target.value)} >
                </textarea>

                <div>
                    <button type="button" onClick={setDisplayForm(false)}>Cancel</button>
                    <button type="submit">Add Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm