import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { selectCount } from "../features/todoSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const { role } = useSelector(selectCount);
  const navigate = useNavigate();

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
