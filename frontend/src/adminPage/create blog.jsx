import { useState, useEffect, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

import Nav from '../components/nav';
import '../styles/admin styles/create-blog-styles.css';

function CreateBlog() {
    const [title, setTitle] = useState("");
    const [article, setArticle] = useState("");
    const [error, setError] = useState(null);

    const editorRef = useRef(null);
    const token = localStorage.getItem("token");
    const apiKey = import.meta.env.VITE_EDITOR_API;

    const navigate = useNavigate();
    const {isLoggedIn, setUser, api} = useOutletContext();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${api}/api/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, article }),
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setError("Failed to create post");
                }
                return;
            }

            setTitle("");
            setArticle("");
            navigate("/admin");
        } catch (err) {
            setError(err.message);
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
                <Editor
                    apiKey={apiKey}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    value={article}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                        "advlist", "autolink", "lists", "link",
                        "preview", "anchor", "searchreplace", "visualblocks",
                        "code", "fullscreen", "insertdatetime",
                        "table", "help", "wordcount"
                        ],
                        toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={(newValue) => setArticle(newValue)}
                />

                <button type="submit">Create Post</button>
            </form>
        </div>
        </>
    )
}

export default CreateBlog;
