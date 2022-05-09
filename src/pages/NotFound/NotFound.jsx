import { useAuth } from "context/AuthContext";
import { Link } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
	const { userState } = useAuth();

	const login = userState.token;
	const email = userState.user.email;

	return (
		<div className="page-not-found">
			<div className="error-number">
				<h1>4</h1>
				<h1>0</h1>
				<h1>4</h1>
			</div>
			<h2>Page Not Found</h2>
			<Link to={login && email ? "/dashboard" : "/"} replace>
				<button className="btn primary-text-btn-lg">Back to Home</button>
			</Link>
		</div>
	);
};
