import React, { useState, useEffect, useContext } from "react";
import ProductForm from "./productForm/ProductForm";
import { updateProduct } from "../api";
import { UserContext } from "../App";


const UpdateProduct = ({ product, setIsUpdate, getMyProducts }) => {
    const [edit, setEdit] = useState(null);
    const [currentUser, setCurrentUser] = useContext(UserContext)
    const patchProduct = async () => {
        if (edit) {
            try {
                const reasult = await updateProduct(edit, product.id)
                alert(reasult.message);
                setIsUpdate(-1);
                if (!currentUser) {
                    getMyProducts(JSON.parse(localStorage.getItem("currentUser")).id)
                }
                else {
                    getMyProducts(currentUser.id)
                }
            } catch (error) {
                if (error.message.includes('Refresh token failed')) {
                    alert('Session expired. Please log in again.');
                    navigate('/login');
                }
                else {
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
