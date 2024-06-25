import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { UserContext } from '../App'
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Profile = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [myProducts, setMyProducts] = useState([]);
    const [isUpdate, setIsUpdate] = useState(-1);
    const handleLogout = () => {
        Cookies.remove('user');
        setCurrentUser(null)
        navigate('/home')
    };

    useEffect(() => {
        console.log(currentUser);
        fetch(`http://localhost:8080/products?ownerId=${currentUser.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMyProducts(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [])


    return <>
        <h1>Profile</h1>
        <div>my products:</div>
        <div>{myProducts.map((product, index) => {
            return <div key={index}>
                <img height={150} width={250} src={product.img} alt={product.title} /><br />
                <span>{product.area}</span><br />
                <span>{product.price}</span><br />
                <span>{product.state}</span>

                <button className='btnUpdate' onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                <button className="btnRemove" disabled={isUpdate === index} onClick={() => remove(todo.id)}><MdDelete /></button>
            </div>
        })}</div>
        <button onClick={handleLogout}>Logout</button>
    </>
}
export default Profile;