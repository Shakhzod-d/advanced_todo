import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import Home from "./pages/Home/Home";
import { Users } from "./pages/Users/Users";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { selectRole } from "./features/me/selectors";

function App() {
  const { role } = useSelector(selectRole);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "") {
      navigate("/login");
    }
    // console.log(role);
  }, [role, navigate]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          index
          element={
            <Suspense fallback={<h2>loading</h2>}>
              <Home />
            </Suspense>
          }
        />

        <Route
          path="/login"
          index
          element={
            <Suspense fallback={<h2>loading</h2>}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute allowedRole="admin">
              <Users />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
