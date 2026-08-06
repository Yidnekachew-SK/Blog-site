import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Nav from "../components/nav";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(["", ""]);
    const {setUser} = useOutletContext();

    const navigate = useNavigate();

    const HandleLogin = async function(e) {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors(data.error);
                return
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);
            console.log('user', data.user)
            
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <>
        <Nav setUser={setUser}/>
        <form onSubmit={HandleLogin}>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" 
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                {errors[0] && <p className="error">{errors[0]}</p>}
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                {errors[1] && <p className="error">{errors[1]}</p>}
            </div>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

export default Login