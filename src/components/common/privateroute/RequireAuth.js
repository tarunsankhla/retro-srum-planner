import React from 'react'
import { Navigate, useLocation } from 'react-router'


function RequiredAuth({ children }) {
    let location = useLocation();
    let auth = true; // auth context will come here
    console.log(auth.user)
    if (!auth) { 
        return <Navigate to="/" state={{from :location  }} replace/>    }
    return children;
}

export default RequiredAuth;