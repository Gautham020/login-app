import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader/Loader";
import NotFound from "./pages/404";
import Welcome from "./pages/Welcome";
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [state, setState] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem("user")));
      window.scrollTo(0, 0);
    } else {
      setLoggedIn(false);
    }
  }, [state]);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/login"
            element={<Login state={state} setState={setState} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
