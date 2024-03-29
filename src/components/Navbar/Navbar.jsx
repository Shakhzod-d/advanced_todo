import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { navItems } from "./helper";

import { selectRole } from "../../features/me/selectors";
import { logout } from "../../features/me/actions";

const Navbar = () => {
  const { role } = useSelector(selectRole);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(role);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Todos</Link>
        </div>
        <div className="nav-items">
          {navItems().map((item, index) => {
            return (
              <div key={index}>
                {role === `user` && item.path !== `/users` && (
                  <div
                    className={`nav-item ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    key={index}
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </div>
                )}

                {role === `admin` && (
                  <div
                    className={`nav-item ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    key={index}
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="user-actions">
          <div className="account"></div>
          <div className="account">
            <span onClick={() => dispatch(logout(() => navigate(`/login`)))}>
              Logout
            </span>{" "}
            {` `}
            <span>Role: {role}</span>{" "}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
