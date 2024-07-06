import React, { useState, useEffect } from "react";
import "../Home/Home.css";
import MenuBar from "./MenuBar/MenuBar";
import ProductImage from "./ProductDisplay/ProductDetailsOverview";

const CategoryPage = ({ type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/type/${type}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(`Error fetching ${type} products:`, error);
      }
    };

    fetchProducts();
  }, [type]);

  return (
    <div className="front-page">
      <MenuBar />
      <div className="product-grid">
        {products.map((product) => (
          <ProductImage key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
