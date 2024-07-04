import React, { useState, useEffect } from "react";
import ProductForm from "./productForm/ProductForm";
import { updateProduct } from "../api";

const UpdateProduct = ({ product, setIsUpdate, getMyProducts }) => {
    const [edit, setEdit] = useState(null);

    const patchProduct = async () => {
        if (edit) {
            try {
                const reasult = await updateProduct(edit, product.id)
                alert(reasult.message);
                setIsUpdate(-1);
                getMyProducts();
            } catch (error) {
                if (error.message.includes('Refresh token failed')) {
                    alert('Session expired. Please log in again.');
                    navigate('/login'); // Navigate to the login page
                }
                else {
                    console.error(error);
                    alert('Error updating product');
                }
            }
        }
    };

    useEffect(() => {
        patchProduct();
    }, [edit, product.id]);

    return (
        <>
            <ProductForm product={product} setEdit={setEdit} setIsUpdate={setIsUpdate} />
        </>
    );
};

export default UpdateProduct;
