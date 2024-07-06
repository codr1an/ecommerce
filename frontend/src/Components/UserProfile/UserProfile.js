import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";
import MenuBar from "../Home/MenuBar/MenuBar";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        };

        const [userResponse, ordersResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/users/me", { headers: headers }),
          axios.get("http://localhost:8080/api/orders", { headers: headers }),
        ]);

        setUser(userResponse.data);
        setOrders(ordersResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        navigate("/home");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="front-page">
      <MenuBar />
      <div className="user-page">
        <div className="order-container">
          <div className="order-items">
            <h3>Your Orders</h3>
            {orders.length === 0 ? (
              <p>No orders available</p>
            ) : (
              orders.map((order, index) => {
                // Create a Date object from the ISO string
                const orderDate = new Date(order.date);

                // Extract day, month, and year from the date object
                const day = orderDate.getDate().toString().padStart(2, "0");
                const month = (orderDate.getMonth() + 1)
                  .toString()
                  .padStart(2, "0"); // Months are zero-based
                const year = orderDate.getFullYear();

                return (
                  <div key={index} className="order-item">
                    <p>
                      <b>Date:</b> {`${day}.${month}.${year}`}
                    </p>
                    <ul>
                      {order.orderItems.map((item, idx) => (
                        <li key={idx} className="product-list">
                          <p>
                            <b>{item.productName}</b>
                          </p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {item.productPrice}€</p>
                        </li>
                      ))}
                    </ul>
                    <p>
                      <b>Total Price:</b> {order.totalPrice}€
                    </p>
                    <p>
                      <b>Status:</b> {order.status}
                    </p>
                  </div>
                );
              })
            )}
          </div>
          <div className="user-profile">
            <h3>Profile</h3>
            <p>
              <b>Username:</b> {user.username}
            </p>
            <p>
              {" "}
              <b>E-Mail: </b> {user.email}
            </p>
            <p>
              <b>Address:</b> {user.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
