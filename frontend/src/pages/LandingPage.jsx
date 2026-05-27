import React from 'react';
import { Link } from "react-router-dom";

import '../styles/LandingPage.css';
import Logo from '../assets/notenest.png';
import Sparkles from '../assets/sparkles.svg';
import ArrowRight from '../assets/arrow-right-stroke.svg';
import benefitsData from '../benefits';

export default function LandingPage() {
    const date = new Date();
    const currentYear = date.getFullYear();

    return(
        <div className='container-fluid mb-4'>
            <div className='container d-flex align-items-center justify-content-between mt-3'>
                <div className='d-flex align-items-center justify-content-center'>
                    <img src={Logo} alt="NoteNest Logo" className='img-fluid app-logo' />

                    <h4 className='app-name mt-3'>NoteNest</h4>
                </div>

                <div className='login-btn'>
                    <Link to="/login" className='login rounded-pill pt-2 pb-2 ps-3 pe-3 border border-1'>Sign in</Link>
                </div>
            </div>

            <div className='container d-flex flex-column align-items-center justify-content-center mt-5 pt-5'>
                <button className='pt-1 pb-1 ps-3 pe-3 rounded-pill reminder border border-1'>
                    <img src={Sparkles} alt="Sparkles" className='img-fluid' />
                    <span className='ms-2'>Remember everything that matters.</span>
                </button>

                <h2 className='text-center mt-3 text-write'>Write it Down.</h2>

                <h2 className='text-center text-remind'>We'll remind you.</h2>

                <p className='text-center importance mt-3'>
                    A soft, paper-warm space for your thoughts. Schedule any note to land back 
                    in your inbox exactly when it matters.
                </p>

                <Link to="/login" className='start-writing rounded-pill pt-2 pb-2 ps-3 pe-3 mt-2'>
                    Start writing
                    <img src={ArrowRight} alt="Right Arrow image" className='img-fluid' />
                </Link>
            </div>

            <div className='container mt-5 mb-5'>
                <div className="row g-4">
                    {benefitsData.map((benefit) => (
                        <div className="col-12 col-sm-6 col-lg-4 d-flex">
                            <div className=" benefit-container p-4">
                                <div className="icon-container rounded-circle d-flex align-items-center justify-content-start">
                                    <img src={benefit.img.src} alt={benefit.img.alt} className="img-fluid" />
                                </div>

                                <h3 className="benefit-title mt-2">{benefit.title}</h3>
                                
                                <p className="benefit-description">{benefit.description}</p>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>

            <div className='container-fluid footer-section mt-5 pt-3'>
                <p className="footer-text text-center">
                    &copy;{currentYear} NoteNest. All rights reserved.
                </p> 
            </div>
        </div>
    )
}