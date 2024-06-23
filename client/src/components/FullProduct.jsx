import React from 'react';
import './FullProduct.css'; // Import custom styles for FullProduct

const FullProduct = ({ product, onClose }) => {
  return (
    <div className="full-product-overlay">
      <div className="full-product">
        <button onClick={onClose} className="close-button">X</button>
        <h2>{product.title}</h2>
        <img src={product.img} alt={product.title} />
        <p>{product.area}</p>
        <p>{product.price}</p>
        <p>{product.state}</p>
        {/* Add other product details as needed */}
      </div>
    </div>
  );
};

export default FullProduct;
