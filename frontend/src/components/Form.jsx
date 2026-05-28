import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import Logo from '../assets/notenest.png';

import { Link } from "react-router-dom";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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
            email,
            password1, 
            password2, 
            };
        }

        const res = await api.post(route, payload);

        if (method === "login") {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/notes");
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
        <div className="container-fluid">
            <form onSubmit={handleSubmit} className="form-container">
                <div className="container d-flex justify-content-center">
                    <img src={Logo} alt="notenest logo" className="img-fluid notenest-logo" />
                </div>
                <div className="form-section">
                    <input
                        className="form-input rounded"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />

                    {method === 'register' && (
                        <input
                        className="form-input rounded"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        />
                    )}

                    <input
                        className="form-input rounded"
                        type="password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        placeholder="Password"
                    />

                    {method === 'register' && (
                        <input
                        className="form-input rounded"
                        type="password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Confirm Password"
                        required
                        />
                    )}

                    {loading && <LoadingIndicator />}
                    <button className="form-button rounded" type="submit">
                        {name}
                    </button>
                    
                    {
                        method === 'login' && ( <Link to="/register" className="register-link d-flex align-items-center justify-content-center">Need an account? Sign up now.</Link> )
                    }
                </div>
            </form>
        </div>
    );
}

export default Form;