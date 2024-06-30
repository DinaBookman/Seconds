import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { UserContext } from '../../App'
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(UserContext);

    useEffect(() => {
        Cookies.remove('user');
        setCurrentUser(null)
        navigate('/home')
    },[])

}
export default Logout;