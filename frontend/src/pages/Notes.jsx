import Logo from "../assets/notenest.png";
import Logout from "../assets/logout.svg";
import { Link } from "react-router-dom";
import '../styles/Notes.css';
import api from "../api";
import { useEffect, useState } from "react";

export default function Notes() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await api.get("/api/user/");
            setUser(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="container-fluid app-details">
                <div className="container d-flex align-items-center justify-content-between mt-1">
                    <div className="d-flex align-items-center justify-content-center">
                        <img src={Logo} alt="notenest logo" className="img-fluid app-logo" />
                        <h4 className="app-name mt-3">NoteNest</h4>
                    </div>

                    
                    <div className="right-side d-flex align-items-center">
                        <div className="email mt-3 me-2">
                            {user && (
                                <p>{user.email}</p>
                            )}
                        </div>
                        <div className='login-btn'>
                            <Link to="/logout" className='login rounded-pill pt-2 pb-2 ps-3 pe-3 border border-1'>
                                <img src={Logout} alt="logout icon" className="img-fluid pe-1 logout" />
                                Sign out
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}