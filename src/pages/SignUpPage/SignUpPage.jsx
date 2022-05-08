import { Login } from "assets/images/images";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "firebase.config";
import { useAuth } from "context/AuthContext";
import "./SignUpPage.css";
import "../LoginPage/LoginPage.css";

export const SignUpPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { userState, userDispatch } = useAuth();
  function guestUserHandler() {
    setData({ email: "dummy@gmail.com", password: "dummy@123" });
  }

  async function onSubmitHandler() {
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );
      console.log("sign resp", response);
      var token = response.user.accessToken ?? "";
      var userid = response.user.uid ?? "";
      var email = response.user.email ?? "";
      var displayName = response.user.displayName ?? "";
      var userpic = response.user.photoURL ?? "";
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken ?? "",
        name: response?.user?.displayName ?? "",
        emailId: response?.user?.email ?? "",
        userId: response?.user?.uid ?? "",
        photo: response.user.photoURL ?? "",
      });
    } catch (err) {
      console.log("sign up err", err);
    }
  }

  async function LoginWIthGoogleAuth() {
    try {
      const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
      var token = response.user.accessToken ?? "";
      var userid = response.user.uid ?? "";
      var email = response.user.email ?? "";
      var displayName = response.user.displayName ?? "";
      var userpic = response.user.photoURL ?? "";
      console.log(token, userid, email, displayName, userpic);
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken ?? "",
        name: response?.user?.displayName ?? "",
        emailId: response?.user?.email ?? "",
        userId: response?.user?.uid ?? "",
        photo: response.user.photoURL ?? "",
      });
      console.log("signup gauth resp", response);
    } catch (err) {
      console.log("signup gauth resp", err);
    }
  }

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
          <div className="login-credential-container">
            <input
              placeholder="Email Address - xyz@gmail.com"
              name="email"
              value={data.email}
              onChange={inputHandler}
            />
          </div>
          <div className="login-credential-container">
            <input
              type="password"
              onChange={inputHandler}
              name="password"
              value={data.password}
              placeholder="Password"
              id=""
            />
          </div>
          <div className="login-rem-forgetpass-container">
            <div className="title-md-wt-5">
              <label>
                <input className="mg-point6-rt" type="checkbox" name="" />
                Remember me
              </label>
            </div>
            <div className="title-md-wt-5">Forgot your password?</div>
          </div>
          <div className="login-cta-buttons">
            <button className="btn primary-btn-md" onClick={onSubmitHandler}>
              Sign Up
            </button>
            <button className="btn secondary-outline-btn-md ">
              <i
                className="fab fa-google mg-point6-rt"
                onClick={LoginWIthGoogleAuth}
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
