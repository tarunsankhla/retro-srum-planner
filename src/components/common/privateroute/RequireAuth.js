import { useAuth } from "context/AuthContext";
import React from "react";
import { Navigate, useLocation } from "react-router";

function RequiredAuth({ children }) {
  let location = useLocation();
  const { userState } = useAuth();
  if (!!userState.token && !!userState.user.emailId) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequiredAuth;
