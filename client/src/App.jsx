import React, { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx'
import Cookies from 'js-cookie';
//import Register from './components/Register.jsx'
import Products from './components/Products.jsx'
import FailToLoadPage from './components/FailToLoadPage.jsx'
import ProductUploadForm from './components/ProductUploadForm.jsx';
import Register from './components/register/Register.jsx';
import FullProduct from './components/FullProduct';
import Profile from './components/Profile.jsx';
import Logout from './components/Logout.jsx';
import MyProducts from './components/MyProducts.jsx';
import MyProfile from './components/MyProfile.jsx';
export const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const getUserFromCookie = () => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  };
  useEffect(() => {
    setCurrentUser(getUserFromCookie);
  }, [])
  //console.log(currentUser)
  //const currentPage = currentUser ? `/users/${currentUser.id}/home` : "/login";
  return (

    <>
      <UserContext.Provider value={[currentUser, setCurrentUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={'/home'} />} />
            <Route path="home" element={<Home />}>
              <Route path="all" element={<Products />} />
              <Route path=':category' element={<Products />} />
              <Route path=':category/:productId' element={<FullProduct />} />
              <Route path="profile" element={<Profile/>} >
                <Route path="myProfile" element={<MyProfile />} />
                <Route path="myProducts" element={<MyProducts />} />
              </Route>
              <Route path="post" element={<ProductUploadForm />} />
            </Route>
            <Route path="*" element={<FailToLoadPage />} />
            <Route path='/auth'>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path='/logout' element={<Logout />} />

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>


    </>
  )
} export default App
