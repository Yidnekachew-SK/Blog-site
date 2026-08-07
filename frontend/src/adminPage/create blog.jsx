import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Nav from '../components/nav';
import '../styles/admin styles/create-blog-styles.css';

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const {isLoggedIn, setUser, api} = useOutletContext();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${api}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, body }),
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setError(data.errors.map((err) => err.msg).join(", "));
                } else {
                    setError("Failed to create post");
                }
                return;
            }

            const data = await response.json();
            setTitle("");
            setBody("");
            navigate("/admin");
        } catch (err) {
            setError(err);
        }
    }


    return(
        <>
        <Nav isLoggedIn={isLoggedIn} setUser={setUser} />
        <div className="blogFormSection">
            <h2 className="header">Create Blog Post</h2>
            {error && <p className="error">{error}</p>}

            <form onSubmit={HandleSubmit} className="blogForm">
                <label htmlFor='title'>Title:</label>
                <input type="text" id='title' name='title' value={title}
                    onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor='editor'>Body:</label>
                <textarea id="editor" name='body' cols={120} rows={30} required/>

                <button type="submit">Create Post</button>
            </form>
        </div>
        </>
    )
}

export default CreateBlog;
