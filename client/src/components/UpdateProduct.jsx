import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";

const UpdateProduct = ({ product }) => {
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        const patchProduct = async () => {
            if (edit) {
                try {
                    const response = await fetch(`http://localhost:8080/products/${product.id}`, {
                        method: 'PATCH',
                        body: edit,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    alert(result.message);
                } catch (error) {
                    console.error('Error updating product:', error);
                    alert('Error updating product');
                }
            }
        };

        patchProduct();
    }, [edit, product.id]);

    return (
        <>
            <ProductForm product={product} setEdit={setEdit} />
        </>
    );
};

export default UpdateProduct;
