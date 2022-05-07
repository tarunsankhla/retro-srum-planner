import logo from './logo.svg';
import { Route, Routes } from 'react-router';
import './App.css';
import { ROUTE_PATH_LandingPage } from './utils/routes';
import { Suspense } from 'react';
import HomePage from './pages/HomePage/HomePage';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <Routes >
        <Route element={<Main />}>
          <Route path={ROUTE_PATH_LandingPage} element={
            <Suspense fallback={<h1>Loading Home...</h1>}>
              <HomePage />
            </Suspense>}
          />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
