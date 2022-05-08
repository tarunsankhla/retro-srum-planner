import { firebaseAuth, googleAuthProvider } from "firebase.config";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LoginPage.css";
import { AnonymousUser } from "utils/boardService";

export const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  function guestUserHandler() {
    setData({ email: "dummy@gmail.com", password: "dummy@123" });
  }
  const { userState, userDispatch } = useAuth();
  // let vari = useAuth();
  async function onSubmitHandler() {
    try {
      const response = await signInWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );
      console.log("login response", response);
      var token = response.user.accessToken;
      var userid = response.user.uid;
      var email = response.user.email;
      var displayName = response.user.displayName;
      var userpic = response.user.photoURL;
      console.log(token, userid, email, displayName, userpic);
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken ?? "",
        name: response?.user?.displayName ?? "",
        emailId: response?.user?.email ?? "",
        userId: response?.user?.uid ?? "",
        photo: response.user.photoURL ?? "",
      });
    } catch (err) {
      console.log("login eror", err);
    }
  }

  async function LoginWIthGoogleAuth() {
    try {
      const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
      console.log("login gauth resp", response);
      // useDispatch()
      var token = response.user.accessToken;
      var userid = response.user.uid;
      var email = response.user.email;
      var displayName = response.user.displayName;
      var userpic = response.user.photoURL;
      console.log(token, userid, email, displayName, userpic);
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken ?? "",
        name: response?.user?.displayName ?? "",
        emailId: response?.user?.email ?? "",
        userId: response?.user?.uid ?? "",
        photo: response.user.photoURL ?? "",
      });
    } catch (err) {
      console.log("login gauth err", err);
    }
  }

  const inputHandler = (e) => {
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const Anonymous = () => {
    console.log("click");
    AnonymousUser(userDispatch);
  };

  return (
    <>
      <div className="login-body-container">
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
                Login
              </button>
              <div className="flex-row-center flex-justify-space-between">
                <button
                  className="btn secondary-outline-btn-md login-logo"
                  onClick={LoginWIthGoogleAuth}
                >
                  <i className="fab fa-google"></i>
                  Login with Google
                </button>
                <button
                  className="btn primary-outline-btn-md "
                  onClick={Anonymous}
                >
                  Anonymous User
                </button>
              </div>
              <Link className="btn primary-text-btn-md mg-1-top" to="/signup">
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
