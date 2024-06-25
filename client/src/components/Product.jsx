import React from "react";

const Product = ({product}) => {

    return <>
     <img height={150} width={250} src={product.img} alt={product.title} /><br />
                <span>{product.area}</span><br />
                <span>{product.price}</span><br />
                <span>{product.state}</span>
    </>
}
export default Product;