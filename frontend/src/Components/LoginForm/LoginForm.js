import React, { useState } from "react";
import "./LoginForm.css";
import { CiUser, CiLock } from "react-icons/ci";
import LoginRequest from "./LoginRequest";
import { useNavigate } from "react-router-dom";

function LoginForm({ toggleForm }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await LoginRequest(formData);
    localStorage.setItem("token", token);
    if (token !== undefined) {
      navigate("/home");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <CiUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <CiLock
            className="password-icon icon"
            onClick={togglePasswordVisibility}
          />{" "}
        </div>

        <button type="submit" className="submit-button">
          Log in
        </button>
        <div className="register-link">
          <p>
            Not registered yet? <a href="register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
