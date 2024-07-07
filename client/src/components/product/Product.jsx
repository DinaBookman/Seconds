import React from "react";
import "./Product.css"; 

const Product = ({ product }) => {
 
  let statusClass = "";
  switch (product.status) {
    case "new":
      statusClass = "status-new";
      break;
    case "great":
      statusClass = "status-great";
      break;
    case "good":
      statusClass = "status-good";
      break;
    case "not bad":
      statusClass = "status-not-bad";
      break;
    case "bad":
      statusClass = "status-bad";
      break;
    default:
      break;
  }

  return (
    <div className="product-container">
      <img
        className="product-image"
        height={150}
        width={250}
        src={product.img}
        alt={product.title}
      />
      <br />
      <span className="product-area">{product.area}</span>
      <br />
      <span className="product-price">{product.price}$</span>
      <br />
      <span className={`product-status ${statusClass}`}>{product.status}</span>
    </div>
  );
};

export default Product;
