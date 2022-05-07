import logo from "data/Logo/logo.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar-wrapper flex-row-center flex-justify-space-between pd-1-all">
      <Link to="/">
        <div>
          <img src={logo} alt="logo" className="navbar-logo" />
        </div>
      </Link>

      <div className="navbar-auth-section flex-row-center">
        <div className="publicboard-searchbar">
          <input type="search" placeholder="Search" />
        </div>
        <button className="btn primary-btn-md" onClick={() => {}}>
          Login
        </button>
        <div class="avatar text-avatar-xsm-round">IN</div>
      </div>
    </div>
  );
};
