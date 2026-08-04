import { useState } from "react"
import Nav from "../components/nav";
import { useOutletContext } from "react-router-dom";

function SignUp() {
    const [signupInfo, setSignupInfo] = useState({ name:"", username:"", password:"" });
    const [errors, setErrors] = useState([]);
    const {setUser} = useOutletContext();

    const HandleSignup = async function(e) {
        e.preventDefault();

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    fulname: signupInfo.name,
                    username: signupInfo.username,
                    password: signupInfo.password
                 }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrors(data.errors);
                return
            }

            localStorage.setItem("token", data.token);
            setUser(data.user);

            window.location.href = "/posts";
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <>
        <Nav />
        { errors.length > 0 && 
            <ul>
                {errors.forEach(error => {
                    <li>{error}</li>
                })}
            </ul>
        }
        <form onSubmit={HandleSignup}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="fullName" id="name" 
                value={signupInfo.name} onChange={(e) => setSignupInfo((prev) => ({...prev, name: e.target.value}))} />
            
            <label htmlFor="username">Username: </label>
            <input type="text" name="username" id="username" 
                value={signupInfo.username} onChange={(e) => setSignupInfo((prev) => ({...prev, username: e.target.value}))} />

            <label htmlFor="password">Password: </label>
            <input type="text" name="password" id="password" 
                value={signupInfo.password} onChange={(e) => setSignupInfo((prev) => ({...prev, password: e.target.value}))} />

            <button type="submit">SignUp</button>
        </form>
        </>
    )
}

export default SignUp