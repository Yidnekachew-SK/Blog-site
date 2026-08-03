import { useState, useEffect } from "react";
import PostCard from "../components/postCard";
import Nav from "../components/nav";

function Homepage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("")
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {
        (async () => {
        try {
            const response = await fetch("/api/posts");

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        }
        })();
    }, []);

    return(
        <>
            <Nav isLoggedIn={isLoggedIn}/>
            {error && <p className="error">{error}</p>}
            <div className="mainSection"> 
                {posts.map((post) => (
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>
        </>
    )
}

export default Homepage