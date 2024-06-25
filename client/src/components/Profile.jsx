import React, { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { UserContext } from '../App'
import { Outlet, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Profile = () => {
 
    return <>
        <h1>Profile</h1>
        <Outlet/>
    </>
}
export default Profile;