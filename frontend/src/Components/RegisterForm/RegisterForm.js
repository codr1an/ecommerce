import axios from "axios";
import React, { useState } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { message } from "react-message-popup";
import "./RegisterForm.css";
import { validateForm } from "./RegisterValidation";

function RegistrationForm({ toggleForm }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear any errors when user types
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.values(errors).some((error) => error !== "")) {
      setFormErrors(errors);
      message.error("Ein Fehler ist bei der Registrierung aufgetreten", 4000);
      return;
    }
    try {
      const headers = {
        accept: "*/*",
        "x-api-key": "keyTest",
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        formData,
        { headers: headers }
      );
      console.log("User registered successfully:", response.data);
      if (response.status === 201) {
        message.success("Registration successful, you may log in", 4000);
      }

      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.error("Username or E-Mail already registered", 4000);
      } else {
        message.error("Something went wrong, please try again later", 4000);
      }
    }
  };

  return (
    <div className="wrapper">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="names">
          <div
            className={`input-box ${formErrors.firstName && "error-message"}`}
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              maxLength={50}
            />
            <CiUser className="icon" />
            {formErrors.firstName && (
              <p className="error-message">{formErrors.firstName}</p>
            )}
          </div>
          <div
            className={`input-box ${formErrors.lastName && "error-message"}`}
          >
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              maxLength={50}
            />
            <CiUser className="icon" />
            {formErrors.lastName && (
              <p className="error-message">{formErrors.lastName}</p>
            )}
          </div>
        </div>
        <div className={`input-box ${formErrors.address && "error-message"}`}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            maxLength={100}
          />
          <CiUser className="icon" />
          {formErrors.address && (
            <p className="error-message">{formErrors.address}</p>
          )}
        </div>
        <div className={`input-box ${formErrors.username && "error-message"}`}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            maxLength={100}
          />
          <CiUser className="icon" />
          {formErrors.username && (
            <p className="error-message">{formErrors.username}</p>
          )}
        </div>
        <div className={`input-box ${formErrors.email && "error-message"}`}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
          />
          <CiMail className="icon" />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div className={`input-box ${formErrors.password && "error-message"}`}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            maxLength={100}
          />
          <CiLock
            className="password-icon icon"
            onClick={togglePasswordVisibility}
          />{" "}
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <button type="submit" className="button">
          Register
        </button>
        <div className="login-link">
          <p>
            Already registered? <a href="login">Log in</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
