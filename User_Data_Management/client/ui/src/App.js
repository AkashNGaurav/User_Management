import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {
  FiltersProvider,
  LoginProvider,
  SearchProvider,
  SignUpProvider,
  UserDetailsProvider,
  DrillDownGraphProvider,
} from "./Context/Provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <LoginProvider>
                <SignUpProvider>
                  <Login />
                </SignUpProvider>
              </LoginProvider>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <UserDetailsProvider>
                <FiltersProvider>
                  <SearchProvider>
                    <DrillDownGraphProvider>
                      <Home />
                    </DrillDownGraphProvider>
                  </SearchProvider>
                </FiltersProvider>
              </UserDetailsProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
