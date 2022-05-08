import { Login } from "assets/images/images";
import React, { useState } from "react";
import { Link, useNavigate as Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "firebase.config";
import { LoginWIthGoogleAuth } from "utils/boardService";
import { useAuth } from "context/AuthContext";
import "./SignUpPage.css";
import "../LoginPage/LoginPage.css";
import { async } from "@firebase/util";

export const SignUpPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { userState, userDispatch } = useAuth();
  const navigate = Navigate();

  const onSubmitHandler = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken ?? "",
        name: response?.user?.displayName ?? "",
        emailId: response?.user?.email ?? "",
        userId: response?.user?.uid ?? "",
        photo: response.user.photoURL ?? "",
      });
      navigate("/");
    } catch (err) {
      console.log("sign up err", err);
    }
  };

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
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
            <button className="btn primary-btn-md" onClick={onSubmitHandler}>
              Sign Up
            </button>
            <button className="btn secondary-outline-btn-md ">
              <i
                className="fab fa-google mg-point6-rt"
                onClick={LoginWIthGoogleAuth(userDispatch)}
              ></i>
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
