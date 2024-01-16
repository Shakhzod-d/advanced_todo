import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../features/me/selectors";

const LoginPage = () => {
  const { role } = useSelector(selectRole);
  const navigate = useNavigate();
  // console.log(role);

  useEffect(() => {
    if (role === "admin" || role === "user") {
      navigate("/");
    }
  }, [role, navigate]);

  return (
    <div className="login-form">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
