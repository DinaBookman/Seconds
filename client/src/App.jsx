import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css'; 
import Home from './components/Home.jsx';
import Login from './components/Login.jsx'
//import Register from './components/Register.jsx'
import Products from './components/Products.jsx'
import FailToLoadPage from './components/FailToLoadPage.jsx'
export const UserContext = createContext();

function App() {
  //const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))
  //console.log(currentUser)
  //const currentPage = currentUser ? `/users/${currentUser.id}/home` : "/login";
  return (
    <> <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={'/home'} />}/>
            <Route path="home" element={<Home/>}>
              <Route path="connect" element={<Login/>}/>
              <Route path='sofas' element={<Products/>}/>
              <Route path='tables' element={<Products/>}/>
              <Route path='beds' element={<Products/>} />
              <Route path='chairs' element={<Products/>} />
              <Route path='closets' element={<Products/>} />
              <Route path='all' element={<Products/>} />
              </Route>
            <Route path="*" element={<FailToLoadPage />} />
          </Routes>
          </BrowserRouter>
           
        
    </>
  )
} export default App
