import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { updateProduct } from "../api";

const UpdateProduct = ({ product,setIsUpdate,getMyProducts }) => {
    const [edit, setEdit] = useState(null);

    const patchProduct = async () => {
        if (edit) {
            try {
                const reasult = await updateProduct(edit,product.id)
                alert(reasult.message);
                setIsUpdate(-1);
                getMyProducts();
            } catch (error) {
                console.error( error);
                alert('Error updating product');
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
