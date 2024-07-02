import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../../App'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Product from "../Product";
import UpdateProduct from "../UpdateProduct";
import { fetchProducts,removeProduct } from "../../api";

const MyProducts = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [myProducts, setMyProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(-1);
    const [isDelete, setIsDelete] = useState(-1);

    const getMyProducts = async () => {
        try {
            const result = await fetchProducts(`ownerId=${currentUser.id}`);
            console.log(result);
            setMyProducts(result);
        }
        catch (err) {
            console.error(err);
        };
    }
    useEffect(() => {
        console.log(currentUser);
        getMyProducts();
    }, [])

    const remove = async (productId) => {
        try {
            const reasult = await removeProduct(productId);
            setIsDelete(-1)
            getMyProducts();
        }
        catch (error) {
            alert("oops somthing went wrong... please try again!");
        }
    }

    return   <>
    <h1>My Products</h1>
    <div>my products:</div>
    <div>
        {myProducts.map((product, index) => (
            <div key={index}>
                {isUpdate !== index ? (
                    <div>
                        <Product product={product} />
                        <div>{product.category}</div>
                        <button className='btnUpdate' onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}>
                            <MdModeEdit />
                        </button>
                        <button className="btnRemove" onClick={() => setIsDelete(index)}>
                            <MdDelete />
                        </button>
                        {isDelete === index && (
                            <div>
                                <span>Are you sure you want to delete this product?</span>
                                <button onClick={() => remove(product.id)}>Yes</button>
                                <button onClick={() => setIsDelete(-1)}>Cancel</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <UpdateProduct product={product} setIsUpdate={setIsUpdate} getMyProducts={getMyProducts} />
                )}
            </div>
        ))}
    </div>
</>
}
export default MyProducts;