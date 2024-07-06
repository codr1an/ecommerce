import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";
import MenuBar from "../Home/MenuBar/MenuBar";
import { message } from "react-message-popup";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 403) {
          navigate("/home");
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/remove`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      });

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== itemId),
      }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      const updatedCartResponse = await fetch(
        "http://localhost:8080/api/cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!updatedCartResponse.ok) {
        throw new Error("Failed to fetch updated cart");
      }

      const updatedCartData = await updatedCartResponse.json();
      message.success("Order placed successfully", 1000);
      setCart(updatedCartData);
    } catch (error) {
      message.error("Order couldn't be placed", 1000);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item quantity");
      }

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      const updatedCartResponse = await fetch(
        "http://localhost:8080/api/cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!updatedCartResponse.ok) {
        throw new Error("Failed to fetch updated cart");
      }

      const updatedCartData = await updatedCartResponse.json();
      setCart(updatedCartData);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  if (!cart || !cart.items) {
    return <div>Loading...</div>;
  }

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="front-page">
      <MenuBar />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={require(`../../../../productImages/${item.product.imageUrl}`)}
                  alt={item.product.name}
                />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Price: {item.product.price}€</p>
                </div>
                <div className="item-actions">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-overview">
            <h3>Total Price: {totalPrice.toFixed(2)}€</h3>
            <button className="order-button" onClick={handleOrder}>
              Order Now
            </button>
          </div>
          <button className="clear-button" onClick={handleClearCart}>
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
