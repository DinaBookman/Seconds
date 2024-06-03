import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import BasicDemo from './BasicDemo';
 
 
 

function Home() {
  //const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))
  //console.log(currentUser)
  //const currentPage = currentUser ? `/users/${currentUser.id}/home` : "/login";
   
 
  return (
    <>
     <BasicDemo/>
       
    </>
  )
} export default Home