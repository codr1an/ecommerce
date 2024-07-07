import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuBar from "../Home/MenuBar/MenuBar";
import "./EditProduct.css";
import { message } from "react-message-popup";

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/home");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
        });
      } catch (error) {
        console.error(`Error fetching ${productId} product:`, error);
      }
    };

    fetchProduct();
  }, [productId, navigate, userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.slice(0, 500), // Cap at 500 characters
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      message.success("Product updated successfully", 2000);
      navigate("/product-management");
    } catch (error) {
      console.error("Error updating product:", error);
      message.error("Something went wrong, please try again", 2000);
    }
  };

  if (userRole !== "admin" || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="front-page">
      <MenuBar />
      <div className="edit-product-page">
        <div className="edit-product-container">
          <div className="product-info">
            {" "}
            <h4>{product.name}</h4>
            <div>
              {product.imageUrl && (
                <img
                  src={require(`../../../productImages/${product.imageUrl}`)}
                  alt={product.name}
                  className="prod-img"
                />
              )}
            </div>
            <p>
              <strong>Id:</strong> {product.id}
            </p>
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Image URL:</strong> {product.imageUrl}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          </div>
          <div className="product-form">
            <h4>Edit Product</h4>
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
                <label>Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  maxLength={255}
                />
              </div>
              <button type="submit" className="update-product-button ">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
