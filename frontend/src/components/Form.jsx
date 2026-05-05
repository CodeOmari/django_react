import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

import { Link } from "react-router-dom";
import Logo from "../assets/NoteNest.png";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const isLogin = method === "login";
    const name = method === "login" ? "Login" : "Register";

     const handleSubmit = async (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        if (method === 'register') {
           if (password1 !== password2) {
            alert("Passwords do not match");
            return;
           }

           if (!passwordRegex.test(password1)) {
             alert("Password must be at least 8 characters long and include at least one special character");
             return;
           }
    }

        setLoading(true);

        try {
        let payload;

        if (method === 'login') {
            payload = { 
            username, 
            password: password1,
            };
        } else {
            payload = { 
            username, 
            password1, 
            password2, 
            };
        }

        const res = await api.post(route, payload);

        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
        } else {
            alert("Account created successfully! Please log in.");
            navigate("/login");
        }
        } catch (error) {
            if (method === "login") {
                alert("Incorrect username or password");
            } else {
                if (error.response && error.response.data) {
                const data = error.response.data;

                const messages = Object.values(data).flat().join("\n");
                    alert(messages);
                } else {
                    alert("Registration failed. Try again.");
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="title">
                <h3>NoteNest</h3>
                <img src={Logo} alt="app logo" />
            </div>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Password"
            />

            {method === 'register' && (
                <input
                className="form-input"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm Password"
                required
                />
            )}

            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {name}
            </button>
            
            {
                method === 'login' && ( <Link to="/register" className="register-link">Need an account? Sign up now.</Link> )
            }
        </form>
    );
}

export default Form;