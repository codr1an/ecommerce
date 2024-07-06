import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CategoryPage from "./Components/Home/CategoryPage";
import Home from "./Components/Home/Home";
import ProductPage from "./Components/Home/ProductDisplay/ProductPage";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import UserProfile from "./Components/UserProfile/UserProfile";
import UserManagement from "./Components/UserManagement/UserManagement";
import EditUser from "./Components/UserManagement/EditUser";
import ProductManagement from "./Components/ProductManagement/ProductManagement";
import EditProduct from "./Components/ProductManagement/EditProduct";
import AddProduct from "./Components/ProductManagement/AddProduct";
import OrderManagement from "./Components/OrderManagement/OrderManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/laptops" element={<CategoryPage type="laptop" />} />
        <Route path="/monitors" element={<CategoryPage type="monitor" />} />
        <Route path="/phones" element={<CategoryPage type="phone" />} />
        <Route path="/tvs" element={<CategoryPage type="tv" />} />
        <Route path="/tablets" element={<CategoryPage type="tablet" />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/edit-user/:userId" element={<EditUser />} />
        <Route path="/product-management" element={<ProductManagement />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-orders" element={<OrderManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
