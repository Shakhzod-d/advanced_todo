// src/components/LoginForm.js
import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import "./styles.scss";
// import { login } from "../../features/todoSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/me/actions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navitage = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "Admin",
      password: "admin123",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(login(values));
      resetForm();
    },
    validate: (values) => {
      const errors = {};

      if (!values.login) {
        errors.login = "Login is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
  });

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="login">Login</label>
            <input
              type="text"
              id="login"
              name="login"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.login}
            />
            {formik.touched.login && formik.errors.login && (
              <div className="error-message">{formik.errors.login}</div>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password" // Change the type to "password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
