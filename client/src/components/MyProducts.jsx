import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../App'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Product from "./Product";
import UpdateProduct from "./UpdateProduct";

const MyProducts = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [myProducts, setMyProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(-1);

    const getMyProducts=()=>{
        fetch(`http://localhost:8080/products?ownerId=${currentUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMyProducts(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    useEffect(() => {
        console.log(currentUser);
        getMyProducts();
    }, [])

    return <>
        <h1>My Products</h1>
        <div>my products:</div>
        <div>{myProducts.map((product, index) => {
            return <div key={index}>
               {isUpdate!= index?<div> <Product product={product} />
                <button className='btnUpdate' onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                <button className="btnRemove" disabled={isUpdate === index} onClick={() => remove(todo.id)}><MdDelete /></button></div>:
                <UpdateProduct product={product} setIsUpdate={setIsUpdate} getMyProducts={getMyProducts}/>}
            </div>
        })}</div>
    </>
}
export default MyProducts;