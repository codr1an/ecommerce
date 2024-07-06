import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import ProductDetailsExtended from "./ProductDetailsExtended";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(`Error fetching ${id} product:`, error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="front-page">
      <MenuBar />
      <div className="product-page-container">
        <div className="product-page">
          <ProductDetailsExtended key={product.id} product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
