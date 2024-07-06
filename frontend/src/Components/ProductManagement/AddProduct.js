import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";
import MenuBar from "../Home/MenuBar/MenuBar";
import "./AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    type: "",
  });

  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
    // If user is not admin, redirect
    if (role !== "admin") {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.slice(0, 255), // Limiting input to 255 characters
    });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      type: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.imageUrl ||
      !formData.type
    ) {
      message.error("Please fill out all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      message.success("Product added successfully", 2000);
      navigate("/product-management");
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Something went wrong, please try again", 2000);
    }
  };

  return (
    <div className="front-page">
      <MenuBar />
      <div className="add-product-page">
        <div className="add-product-container">
          <div className="product-form">
            <h4>Add Product</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={30}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ resize: "none" }}
                  maxLength={255}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select type</option>
                  <option value="tv">TV</option>
                  <option value="phone">Phone</option>
                  <option value="laptop">Laptop</option>
                  <option value="tablet">Tablet</option>
                  <option value="monitor">Monitor</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  maxLength={255}
                />
              </div>
              <button type="submit" className="add-new-product-button">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
