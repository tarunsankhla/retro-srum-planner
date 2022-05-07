import React, { createContext, useContext, useReducer, useState } from "react";
import { ROUTES } from "utils/routes";

const AuthContext = createContext(null);

const intitailState = {
  token: "",
  user: {
    name: "",
    emailId: "",
    userId: "",
    photo: "",
  },
};

const UserAuthReducer = (state, action) => {
  if (action.type === "userauth") {
    var user = {
      name: action.name,
      emailId: action.emailId,
      userId: action.userId,
      photo: action.photo,
    };
    return { token: action.token, user: user };
  }
  return { ...state };
};

const AuthProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(
    UserAuthReducer,
    JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN)) ?? intitailState
  );

  localStorage.setItem(ROUTES.VAR_ENCODE_TOKEN, JSON.stringify(userState));

  return (
    <AuthContext.Provider value={{ userState, userDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
