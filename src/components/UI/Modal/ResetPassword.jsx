import { useState } from "react";
import { resetPassword } from "utils/boardService";

import "./ResetPassword.css";
export const ResetPassword = ({ setShowResetPassword }) => {
  const [email, setEmail] = useState("");

  const sendResetClickHandler = () => {
    if (email.trim() === "") {
      alert("Email cannot be blank");
    } else {
      resetPassword(email);
      setShowResetPassword(false);
      alert("Check your email to reset password");
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={sendResetClickHandler}>
        <button
          onClick={() => setShowResetPassword(false)}
          className="btn icon-btn-sm close-btn"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="no-outline-email-input">
          <label>
            <p className="mg-1-bot">Enter Email to reset your password</p>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="enter email"
            />
          </label>
        </div>
        <button type="submit" className="btn primary-btn-md">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};
