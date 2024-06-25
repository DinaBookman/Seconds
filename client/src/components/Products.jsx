import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import FullProduct from "./FullProduct";
import Searches from "./Searches";
import "./Products.css"; // Import your CSS file for custom styles

function Products() {
  const [products, setProducts] = useState([]);
  const [fullView, setFullView] = useState(-1); // State to track which product is in full view
  const [searchQuery, setSearchQuery] = useState("");
  const [address, setAddress] = useState('');

  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setSearchQuery(`category=${category}`);
    }
  }, [category]);

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:8080/products?${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [searchQuery]);

  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId);
    navigate(`${productId}`);
  };

  return (
    <div className="products-container">
      <div className="fixed-searches">
        <Searches address={address} setAddress={setAddress} setSearchQuery={setSearchQuery} />
      </div>
      <div className="products-list">
        {products.map((product, i) => (
          <div
            onClick={() => handleProductClick(product.id)}
            key={i}
            className={`product-item ${fullView !== -1 && fullView !== i ? 'grayed-out' : ''}`}
          >
            <img height={150} width={250} src={product.img} alt={product.title} />
            <span>{product.area}</span>
            <span>{product.price}</span>
            <span>{product.state}</span>
          
          </div>
        ))}
          {/* <Outlet /> */}
      </div>
      <Outlet />
    </div>
  );
}

export default Products;
