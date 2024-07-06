import React, { useState, useEffect } from "react";
import "./ProductManagement.css";
import MenuBar from "../Home/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom";
import { message } from "react-message-popup";

const ProductManagement = () => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/home");
      return;
    }

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        navigate("/home");
      }
    };

    fetchProducts();
  }, [navigate, userRole]);

  if (userRole !== "admin" || !products) {
    return <div>Loading...</div>;
  }

  if (!products) {
    return <div>Loading...</div>;
  }

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
    console.log(`Update product with ID: ${productId}`);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      message.success("Product deleted successfully", 2000);
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Something went wrong, please try again", 2000);
    }
  };

  return (
    <div className="front-page">
      <MenuBar />
      <div className="edit-product-page">
        <h1>Product Management</h1>

        <div className="edit-product-container">
          <table border="1" className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image Url</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.imageUrl}</td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="add-product-button" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;
