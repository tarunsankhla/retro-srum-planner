import { Route, Routes } from "react-router";
import "./App.css";
import { ROUTES } from "./utils/routes";
import { Suspense } from "react";
import Main from "./Main";
import { Publicboard, HomePage } from "pages";

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
        </Route>
        <Route
          path={ROUTES.ROUTE_PATH_PublicDashboardPage}
          element={<Publicboard />}
        />
      </Routes>
    </div>
  );
}

export default App;
