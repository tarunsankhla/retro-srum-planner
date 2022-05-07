import { Login } from "assets/images/images";
import { firebaseAuth, googleAuthProvider } from "firebase.config";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LoginPage.css";

export const LoginPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  function guestUserHandler() {
    setData({
      email: "dummy@gmail.com",
      password: "dummy@123",
    });
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
        token: response?.user?.accessToken,
        name: response?.user?.displayName,
        emailId: response?.user?.email,
        userId: response?.user?.uid,
        photo: response.user.photoURL,
      });
    } catch (err) {
      console.log("login eror", err);
    }
  }

  async function LoginWIthGoogleAuth() {
    try {
      const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
      console.log("login gauth resp", response);
      //   useDispatch()
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
      console.log("login gauth err", err);
    }
  }

  const inputHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
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
              <button className="btn primary-btn-md" onClick={onSubmitHandler}>
                Login
              </button>
              <button
                className="btn primary-btn-md"
                onClick={() => {
                  guestUserHandler();
                }}
              >
                Guest User
              </button>
            <button 
                className=" login-logo">
              <i className="fab fa-google" onClick={LoginWIthGoogleAuth}>
              </i>Login with Google
            </button>
            <Link className="btn primary-text-btn-sm create-account-btn " to="/signup">
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
