import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "@react-email/components";

const FullProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setProduct(data.data[0]);
          console.log(data.data[0]);
        } else {
          console.error('No product data found');
        }
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, []);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.img} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Link href={`mailto:${product.email}?subject=${encodeURIComponent(`${product.title} via Seconds.com`)}`}>
        {product.email}
      </Link>
      <div>{product.name}</div>
      <a href={`tel:${product.phone}`}>{product.phone}</a>
      <div>{product.state}</div>
      <div>{product.area}</div>
    </div>
  );
};

export default FullProduct;
