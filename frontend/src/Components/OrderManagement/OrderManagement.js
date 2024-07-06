import React, { useEffect, useState } from "react";
import axios from "axios";
import MenuBar from "../Home/MenuBar/MenuBar";
import "./OrderManagement.css";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "admin") {
      navigate("/home");
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://localhost:8080/api/orders/all",
          {
            headers,
          }
        );

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        navigate("/home");
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const statusUpdateDTO = { status: newStatus };

      await axios.put(
        `http://localhost:8080/api/orders/${orderId}/status`,
        statusUpdateDTO,
        {
          headers,
        }
      );

      // Update the orders state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="front-page">
      <MenuBar />
      <div className="orders-page">
        <h1>All Orders</h1>
        <div className="order-container">
          <div className="order-items">
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
                    <ul>
                      <p>
                        <b>User: </b>
                        {order.firstName} {order.lastName}
                      </p>
                      <p>{order.address} </p>
                    </ul>

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
                    <ul>
                      <p>
                        <b>Status:</b> {order.status}
                      </p>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="ordered">ordered</option>
                        <option value="paid">paid</option>
                        <option value="in delivery">in delivery</option>
                      </select>
                    </ul>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
