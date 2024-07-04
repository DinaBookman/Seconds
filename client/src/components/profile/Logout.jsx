import React, { useContext, useEffect } from "react";
import Cookies from 'js-cookie';
import { UserContext } from '../../App';
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(UserContext);


    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                credentials: 'include', 
            });

            if (response.ok) {
                localStorage.removeItem("currentUser");
                setCurrentUser(null);
                navigate('/home');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        logout();
    }, []);

    return null;
};

export default Logout;
