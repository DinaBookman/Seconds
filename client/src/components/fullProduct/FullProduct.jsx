// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Link } from "@react-email/components";
// import { fetchProduct } from '../../api';

// const FullProduct = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   const getProduct = async () => {
//     try {
//       const reasult = await fetchProduct(productId);
//       setProduct(reasult.data[0]);
      
//     } catch(error) {
//       console.error('No product data found');
//       alert("oops somthing went wrong...")
//     }
//   }
   

// useEffect(() => {
//   getProduct();
// }, []);

// if (!product) return <div>Loading...</div>;

// return (
//   <div>
//     <h1>{product.title}</h1>
//     <img src={product.img} alt={product.title} />
//     <p>{product.description}</p>
//     <p>Price: ${product.price}</p>
//     <Link href={`mailto:${product.email}?subject=${encodeURIComponent(`${product.title} via Seconds.com`)}`}>
//       {product.email}
//     </Link>
//     <div>{product.name}</div>
//     <a href={`tel:${product.phone}`}>{product.phone}</a>
//     <div>{product.status}</div>
//     <div>{product.area}</div>
//   </div>
// );
// };

// export default FullProduct;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "@react-email/components";
import { fetchProduct } from '../../api';
import './FullProduct.css';

const FullProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const reasult = await fetchProduct(productId);
      setProduct(reasult.data[0]);
    } catch (error) {
      console.error('No product data found');
      alert("Oops, something went wrong...");
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="full-product">
      <h1>{product.title}</h1>
      <img src={product.img} alt={product.title} />
      <p className="price">Description: {product.description}</p>
      <p className="price">Price: ${product.price}</p>
      <p className="price">Status:  {product.status}</p>
      <p className="price">Area:   {product.area}</p>
      <div className="contact">
        <h5>CONTACT OWNER</h5>
        <div>{product.name}</div>
        <a href={`tel:${product.phone}`}>{product.phone}</a>
        <Link href={`mailto:${product.email}?subject=${encodeURIComponent(`${product.title}`)}`}>
        {product.email}
      </Link>
      </div>
    </div>
  );
};

export default FullProduct;
