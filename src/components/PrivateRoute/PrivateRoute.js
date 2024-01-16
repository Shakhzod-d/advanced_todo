import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../../features/me/selectors";

const PrivateRoute = ({ allowedRole, children }) => {
  const { role } = useSelector(selectRole);

  return role === allowedRole ? children : <Navigate to="/" />;
};

export default PrivateRoute;
