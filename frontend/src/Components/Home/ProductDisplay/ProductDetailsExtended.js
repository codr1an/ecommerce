import React from "react";
import { message } from "react-message-popup";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (response.status === 403) {
        navigate("/login");
      }

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      message.success("Item added", 1500);
      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="product-details">
      <div className="product-image">
        {product.imageUrl && (
          <img
            src={require(`../../../../../productImages/${product.imageUrl}`)}
            alt={product.name}
          />
        )}
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>Price: {product.price}€</p>
        <p>{product.description}</p>
        <button type="button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
