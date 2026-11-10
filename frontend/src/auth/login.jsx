import { useState } from "react";
import '../styles/authStyles.css';
import Nav from '../components/nav';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(["", ""]);

    const handleLogin = async function(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/login", {
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

            window.location.href = "/upload";
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <>
            <Nav />
            <div className="formSection">
                <form className="loginForm" onSubmit={handleLogin}>
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
            </div>
        </>
    )
}

export default Login