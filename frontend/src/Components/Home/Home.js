import React, { useState, useEffect } from "react";
import "./Home.css";
import MenuBar from "./MenuBar/MenuBar";
import Pagination from "./Pagination";
import ProductDetailsOverview from "./ProductDisplay/ProductDetailsOverview";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="front-page">
        <MenuBar />

        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductDetailsOverview key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
