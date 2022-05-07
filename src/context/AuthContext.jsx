import { firestore } from "firebase.config";
import { doc, setDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
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
<<<<<<< HEAD
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
=======
	if (action.type === "userauth") {
		var user = {
			name: action.name,
			emailId: action.emailId,
			userId: action.userId,
			photo: action.photo,
		};
		return { token: action.token, user: user };
	}
	else if(action.type === "reset"){
		localStorage.removeItem(ROUTES.VAR_ENCODE_TOKEN);
		return intitailState;
	 }

	return state ;
>>>>>>> master
};

const AuthProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(
    UserAuthReducer,
    JSON.parse(localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN)) ?? intitailState
  );

  localStorage.setItem(ROUTES.VAR_ENCODE_TOKEN, JSON.stringify(userState));

  // useEffect(() => {
  // 	if (!!useState.token) {
  // 		const userRef = doc(firestore, `users/${userState.user.userId}`);
  // 		const setData = async () => {
  // 			try {
  // 				const response = await setDoc(userRef, {});
  // 				console.log(response);
  // 			} catch (err) {
  // 				console.log(err);
  // 			}
  // 		};
  // 		setData();
  // 	}
  // }, [userState]);

  return (
    <AuthContext.Provider value={{ userState, userDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
