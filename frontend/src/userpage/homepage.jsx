import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import PostCard from "../components/postCard";
import Nav from "../components/nav";
import '../styles/user styles/homepage-styles.css';

function Homepage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("")
    const {isLoggedIn, user, setUser} = useOutletContext();
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
        try {
            const response = await fetch("/api/posts", {
                headers: {Authorization: `Bearer ${token}`}
            });

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

    if (error) return <p>{error}</p>;
    if (!posts) return <p>Loading posts...</p>;

    return(
        <>
            <Nav isLoggedIn={isLoggedIn} setUser={setUser}/>
            {user?.role === "Admin" && 
                <Link to="/admin" className="adminPageLink">Go to Admin page</Link>
            }
            <div className="mainSection">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </>
    )
}

export default Homepage