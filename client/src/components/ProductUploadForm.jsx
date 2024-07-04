import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import ProductForm from './productForm/ProductForm';
import { addProduct } from '../api';

const ProductUploadForm = () => {
  const [data, setData] = useState(null);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    if (!currentUser&& !JSON.parse(localStorage.getItem("currentUser"))) {
      navigate('/auth/login', { state: { from: '/home/post' } });
    }
  }, [currentUser, navigate]);

  const postProduct = async () => {
    console.log("kkk", data)
    if (data) {
      try {
        const result = await addProduct(data);
        alert("uploaded successfuly");
        navigate('/home')
      } catch (error) {
        console.error('Error uploading product:', error);
        alert('Error uploading product');
      }
    }
  };

  useEffect(() => {
    postProduct();
  }, [data]);

  return <ProductForm setData={setData} />;
};

export default ProductUploadForm;
