import { Login } from "assets/images/images";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleAuthProvider } from "firebase.config";
import { useAuth } from "context/AuthContext";

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
      var token = response.user.accessToken;
      var userid = response.user.uid;
      var email = response.user.email;
      var displayName = response.user.displayName;
      var userpic = response.user.photoURL;
      console.log(token, userid, email, displayName, userpic);
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken,
        name: response?.user?.displayName,
        emailId: response?.user?.email,
        userId: response?.user?.uid,
        photo: response.user.photoURL,
      });
    } catch (err) {
      console.log("sign up err", err);
    }
  }

  async function LoginWIthGoogleAuth() {
    try {
      const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
      var token = response.user.accessToken;
      var userid = response.user.uid;
      var email = response.user.email;
      var displayName = response.user.displayName;
      var userpic = response.user.photoURL;
      console.log(token, userid, email, displayName, userpic);
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken,
        name: response?.user?.displayName,
        emailId: response?.user?.email,
        userId: response?.user?.uid,
        photo: response.user.photoURL,
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
    <>
      <div className="login-body-container">
        <img src={Login} className="login-logo" alt="login-logo" />
        <div className="login-container">
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
              <div>
                <input type="checkbox" name="" id="" />
                Remember me
              </div>
              <div className="btn-link">Forgot your password?</div>
            </div>
            <div className="login-btn-container">
              <div className="btn login-action-btn" onClick={onSubmitHandler}>
                Sign Up
              </div>
            </div>

            <div>
              <i className="fab fa-google" onClick={LoginWIthGoogleAuth}>
                Google
              </i>
            </div>

            <Link className="login-footer" to="/login">
              Already Exist
              <span className="material-icons-round">navigate_next</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
