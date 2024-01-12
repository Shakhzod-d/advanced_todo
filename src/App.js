import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { selectCount } from "./features/todoSlice";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import Home from "./pages/Home/Home";
import Cookies from "universal-cookie";
import { Users } from "./pages/Users/Users";

// Create a cookies instance
const cookies = new Cookies();

function App() {
  const { role } = useSelector(selectCount);
  const navigate = useNavigate();

  const userToken = cookies.get("auth");
  // console.log(userToken);

  // console.log(myCookieValue);
  useEffect(() => {
    if (role === "") {
      navigate("/login");
    }
    console.log(role);
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
          index
          element={
            <Suspense fallback={<h2>loading</h2>}>
              <Users />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
