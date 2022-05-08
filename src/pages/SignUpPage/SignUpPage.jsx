import { Login } from "assets/images/images";
import React, { useState } from "react";
import { Link, useNavigate as Navigate } from "react-router-dom";
import { LoginWIthGoogleAuth, signupWithEmail } from "utils/boardService";
import { useAuth } from "context/AuthContext";
import "./SignUpPage.css";
import "../LoginPage/LoginPage.css";

export const SignUpPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { userDispatch } = useAuth();
  const navigate = Navigate();

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const signupSubmitHandler = () => {
    signupWithEmail(userDispatch, data, navigate);
  };

  const signupWithGoogleHandler = () => {
    LoginWIthGoogleAuth(userDispatch, navigate);
  };

  return (
    <div className="signup-body-container">
      <img src={Login} className="signup-image" alt="login-logo" />
      <div className="signup-container">
        <div className="title-header">
          <input
            placeholder="Email Address - xyz@gmail.com"
            name="email"
            value={data.email}
            onChange={inputHandler}
          />
          <input
            type="password"
            onChange={inputHandler}
            name="password"
            value={data.password}
            placeholder="Password"
            id=""
          />
          <div className="login-cta-buttons">
            <button
              className="btn primary-btn-md"
              onClick={signupSubmitHandler}
            >
              Sign Up
            </button>
            <button
              className="btn secondary-outline-btn-md"
              onClick={signupWithGoogleHandler}
            >
              <i className="fab fa-google mg-point6-rt"></i>
              Continue with Google
            </button>
          </div>
          <Link className="flex-row-center text-dark" to="/login">
            <h2 className="title-md-wt-4 mg-1-rt"> Already Exist ?</h2>
            <span>
              <h2 className="title-md-wt-5">Sign In</h2>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
