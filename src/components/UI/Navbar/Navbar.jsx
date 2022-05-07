import { useAuth } from "context/AuthContext";
import logo from "data/Logo/logo.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/routes";
import "./Navbar.css";

export const Navbar = () => {
<<<<<<< HEAD
  const { userState } = useAuth();
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
          <Link to={ROUTES.ROUTE_PATH_LoginPage}>Login</Link>
        </button>

        {userState.user.photo ? (
          <div class="avatar avatar-xsm-round">
            <img loading="lazy" src={userState.user.photo} alt="avatar-image" />
          </div>
        ) : (
          <div class="avatar text-avatar-xsm-round">IN</div>
        )}
      </div>
    </div>
  );
=======
	const { userState } = useAuth();
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
					<Link to={ROUTES.ROUTE_PATH_LoginPage}>Login</Link>
				</button>

				{userState.user.photo ? (
					<div className="avatar avatar-xsm-round">
						<img loading="lazy" src={userState.user.photo} alt="avatar-image" />
					</div>
				) : (
					<div className="avatar text-avatar-xsm-round">IN</div>
				)}
			</div>
		</div>
	);
>>>>>>> master
};
