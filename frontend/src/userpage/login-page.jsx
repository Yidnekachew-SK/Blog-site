import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(["", ""]);

    const handleLogin = async function(e) {
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

            window.location.href = "/posts";
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <form onSubmit={handleLogin}>
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
    )
}

export default Login