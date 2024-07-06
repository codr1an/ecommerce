import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { message } from "react-message-popup";
import "../RegisterForm/RegisterForm.css";
import { editValidateForm } from "./EditUserValidation";
import { useNavigate, useParams } from "react-router-dom";

function EditUser({ toggleForm }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data;
        setFormData({
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          email: userData.email,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/home");
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = editValidateForm(formData);
    console.log("Errors:", errors);
    if (Object.values(errors).some((error) => error !== "")) {
      console.log("Errors detected, not submitting the form");
      setFormErrors(errors);
      message.error("Please fill all fields", 4000);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        "x-api-key": "keyTest",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `http://localhost:8080/api/users/${userId}`,
        formData,
        { headers: headers }
      );
      console.log("User updated successfully:", response.data);
      if (response.status === 200) {
        message.success("Update successful", 4000);
        navigate("/user-management");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.status === 409) {
        message.error("Username or email already registered", 4000);
      }
    }
  };

  return (
    <div className="wrapper">
      <h1>Edit User</h1>
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
        <button type="submit" className="button">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
