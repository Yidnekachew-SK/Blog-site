import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

import PostCard from "../components/postCard";
import Nav from "../components/nav";
import '../styles/admin styles/dashboard-styles.css'

function Dashboard() {
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [unpublishedPosts, setUnpublishedPosts] = useState([]);
    const [error, setError] = useState("");
    const [option, setOption] = useState('published');

    const {isLoggedIn, user, setUser} = useOutletContext();

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchPublishedPosts();
        fetchUnpublishedPosts();
    }, [option]);

    const fetchPublishedPosts = async function() {
        try {
            const response = await fetch("/api/posts");

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPublishedPosts(data);
        } catch (err) {
            setError(err.message);
        }
    }

    const fetchUnpublishedPosts = async function() {
        try {
            const response = await fetch("/api/posts/unpublished", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setUnpublishedPosts(data);
        } catch (err) {
            setError(err.message);
        }
    }

    const HandlePostOption = function(e) {
        setOption(e.target.value);
    }

    if (error) return <p>{error}</p>;
    if (!publishedPosts || !unpublishedPosts) return <p>Loading posts...</p>;

    return(
        <>
            <Nav isLoggedIn={isLoggedIn} setUser={setUser}/>
            <div className="adminPageOptions">
                <select name="option" id="postOption" value={option} onChange={HandlePostOption}>
                    <option value="published">Published Posts</option>
                    <option value="unpublished">Unpublished Posts</option>
                </select>
                <div className="adminLinks">
                    <Link to="/admin/create/post" className="adminLink">create blog</Link>
                    <Link to="/" className="adminLink">Go back to user page</Link>
                </div>
            </div>

            <div className="dashboard mainSection">
                {option === 'published' ? 
                    <>
                    {publishedPosts.map((post) => (
                        <PostCard key={post.id} post={post} isAdmin={true}/>
                    ))}
                    </> :
                    <>
                    {unpublishedPosts.map((post) => (
                        <PostCard key={post.id} post={post} isAdmin={true}/>
                    ))}
                    </>
                }
            </div>
        </>
    )
}

export default Dashboard