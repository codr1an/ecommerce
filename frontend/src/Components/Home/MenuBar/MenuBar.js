import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { message } from "react-message-popup";
import "./MenuBar.css";

const MenuBar = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserInfo(storedToken);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRole(data.role);
        localStorage.setItem("role", data.role);
      } else {
        console.error("Failed to fetch user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleUserOption = (option) => {
    if (option === "profile") {
      navigate("/profile");
    } else if (option === "login") {
      navigate("/login");
    } else if (option === "register") {
      navigate("/register");
    } else if (option === "manageUsers") {
      navigate("/user-management");
    } else if (option === "manageProducts") {
      navigate("/product-management");
    } else if (option === "orders") {
      navigate("/all-orders");
    } else if (option === "logout") {
      message.success("You have been logged out", 1500);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(null);
      setRole(null);
      navigate("/home");
    }
    setUserMenuOpen(false);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <header>
      <div className="menu-container">
        <div className="menu-bar">
          <div className="logo-container">
            <a href="/home" className="logo-link">
              <img src={logo} alt="Logo" className="logo-img" />
            </a>
            <a href="/home" className="logo-text-link">
              <h2 className="logo-text">LA-Shop</h2>
            </a>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="menu-buttons-container">
            <button className="menu-buttons" onClick={handleUserMenu}>
              <FaUser />
            </button>
            {isUserMenuOpen && (
              <div className="dropdown-menu">
                {token !== null ? (
                  <>
                    <button onClick={() => handleUserOption("profile")}>
                      Profile
                    </button>
                    {role === "admin" && (
                      <button onClick={() => handleUserOption("manageUsers")}>
                        Users
                      </button>
                    )}
                    {role === "admin" && (
                      <button
                        onClick={() => handleUserOption("manageProducts")}
                      >
                        Products
                      </button>
                    )}
                    {role === "admin" && (
                      <button onClick={() => handleUserOption("orders")}>
                        Orders
                      </button>
                    )}
                    <button onClick={() => handleUserOption("logout")}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleUserOption("login")}>
                      Login
                    </button>
                    <button onClick={() => handleUserOption("register")}>
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
            <button className="menu-buttons" onClick={handleCart}>
              <FaShoppingCart />
            </button>
          </div>
          <div className="categories-bar">
            <a href="/phones" className="category">
              Phones
            </a>
            <a href="/tablets" className="category">
              Tablets
            </a>
            <a href="/laptops" className="category">
              Laptops
            </a>
            <a href="/tvs" className="category">
              TVs
            </a>
            <a href="/monitors" className="category">
              Monitors
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MenuBar;
