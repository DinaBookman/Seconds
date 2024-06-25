import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PlaceAutocomplete from './PlaceAutoComplete';
import ProductForm from './ProductForm';

const ProductUploadForm = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const postProduct = async () => {
      console.log("kkk",data )
      if (data) {
        try {
          console.log(data, "flooooooooooooooooooojjk");

          const response = await fetch('http://localhost:8080/products', {
            method: 'POST',
            body: data,
            headers: {
              // 'Content-Type': 'multipart/form-data', // Don't set this manually when using FormData
              'Accept': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          alert(result.message);
        } catch (error) {
          console.error('Error uploading product:', error);
          alert('Error uploading product');
        }
      }
    };

    postProduct();
  }, [data]);

  return <ProductForm setData={setData} />;
};

export default ProductUploadForm;
