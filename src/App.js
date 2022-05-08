import { Route, Routes } from "react-router";
import "./App.css";
import { ROUTES } from "./utils/routes";
import { Suspense } from "react";
import Main from "./Main";
import { Publicboard, HomePage, MainDashboard, NotFound } from "pages";
import { LoginPage } from "pages/LoginPage/LoginPage";
import { SignUpPage } from "pages/SignUpPage/SignUpPage";
import RequiredAuth from "components/common/privateroute/RequireAuth";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route element={<Main />}>
					<Route
						path={ROUTES.ROUTE_PATH_LandingPage}
						element={
							<Suspense fallback={<h1>Loading Home...</h1>}>
								<HomePage />
							</Suspense>
						}
					/>
					<Route path={ROUTES.ROUTE_PATH_LoginPage} element={<LoginPage />} />
					<Route path={ROUTES.ROUTE_PATH_SignupPage} element={<SignUpPage />} />
					<Route
						path={ROUTES.ROUTE_PATH_PublicDashboardPage}
						element={<Publicboard />}
					/>
					<Route
						path={ROUTES.ROUTE_PATH_UserDashboaedPage}
						element={
							<RequiredAuth>
								<MainDashboard />
							</RequiredAuth>
						}
					/>
				</Route>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
    );
}

export default App;
