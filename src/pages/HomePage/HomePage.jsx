import { LandingImage } from "assets/images/images";
import { useAuth } from "context/AuthContext";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"

export const HomePage = () => {

  const {userState} = useAuth();

  return <>
  <div className="homepage">
    <div className="homepage-content">
    <div className="homepage-title">
      The best free software to increase your productivity
    </div>
    <div className="homepage-cta-wrapper">
    <ul className="home-list">
      <li className="home-list-item"><i className="fas fa-check"></i>Increases your productivity</li>
      <li className="home-list-item"><i className="fas fa-check"></i>100% free plan for all users</li>
    </ul>
    <div className="homepage-cta">
      {userState.token?
    <Link to="/dashboard" className="homepage-btn btn primary-btn-md">Dashboard</Link>:""}
    </div>
    </div>
    </div>
    <div className="homepage-hero-img">
      <img src={LandingImage} alt="images"/>
    </div>
  </div>
    <div className="home-footer">Made with ❤️ by team nitro</div>
  </>
  ;
};

