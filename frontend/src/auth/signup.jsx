import { useState } from "react";
import '../styles/authStyles.css';
import Nav from '../components/nav';

function SignUp() {
    const [signupInfo, setSignupInfo] = useState({ name:"", username:"", password:"" });
    const [errors, setErrors] = useState([]);

    const handleSignup = async function(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/signup/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    fullname: signupInfo.name,
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

            window.location.href = "/upload";
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <>
        <Nav />
        <div className="formSection">
            { errors.length > 0 && 
                <ul>
                    {errors.forEach(error => {
                        <li>{error}</li>
                    })}
                </ul>
            }
            <form className="signupForm" onSubmit={handleSignup}>
                <label htmlFor="name">Name: </label>
                <input type="text" name="fullName" id="name" 
                    value={signupInfo.name} onChange={(e) => setSignupInfo((prev) => ({...prev, name: e.target.value}))} />
                
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" 
                    value={signupInfo.username} onChange={(e) => setSignupInfo((prev) => ({...prev, username: e.target.value}))} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" 
                    value={signupInfo.password} onChange={(e) => setSignupInfo((prev) => ({...prev, password: e.target.value}))} />

                <button type="submit">SignUp</button>
            </form>
        </div>
        </>
    )
}

export default SignUp