import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "components";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer style={{fontSize:"1.2em"}} />
    </div>
  );
};

export default Main;
