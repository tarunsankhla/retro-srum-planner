import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "components";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
