import { Link } from "react-router"

function Nav({isLoggedIn}) {
    return(
        <nav>
            <h2 className="blogName">My Blog</h2>
            <div className="navigationLinks">
                <Link to="/" className="links">Home</Link>
                { isLoggedIn ? <Link to="/logout" className="links">Logout</Link> : 
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