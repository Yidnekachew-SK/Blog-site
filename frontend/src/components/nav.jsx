import { Link } from "react-router-dom"

function Nav({isLoggedIn, setUser}) {
    const Logout = async function() {
        localStorage.removeItem("token", data.token);
        setUser(null);
        Navigate("/");
    }

    return(
        <nav>
            <h2 className="blogName">My Blog</h2>
            <div className="navigationLinks">
                <Link to="/" className="links">Home</Link>
                { isLoggedIn ? <button to="/logout" className="links" onClick={Logout}>Logout</button> : 
                    <>
                    <Link to="/login" className="links">Login</Link>
                    <Link to="/signup" className="links">SignUp</Link>
                    </> 
                }
            </div>
        </nav>
    )
}

export default Nav