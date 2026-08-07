import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Nav from '../components/nav';


function CreateBlog() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const {isLoggedIn, setUser} = useOutletContext();

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("/api/posts", {
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
        <div>
            <h2>Create Blog Post</h2>
            {error && <p>{error}</p>}

            <form onSubmit={HandleSubmit}>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input type="text" id='title' name='title' value={title}
                        onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor='editor'>Body:</label>
                    <textarea id="editor" name='body' cols={150} rows={40}/>
                </div>

                <button type="submit">Create Post</button>
            </form>
        </div>
        </>
    )
}

export default CreateBlog;
