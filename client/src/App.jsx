import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './components/Home.jsx';
import Login from './components/login/Login.jsx';
import Products from './components/products/Products.jsx';
import FailToLoadPage from './components/FailToLoadPage.jsx';
import ProductUploadForm from './components/ProductUploadForm.jsx';
import Register from './components/register/Register.jsx';
import FullProduct from './components/fullProduct/FullProduct.jsx';
import Profile from './components/profile/Profile.jsx';
import Logout from './components/profile/Logout.jsx';
import MyProducts from './components/profile/MyProducts.jsx';
import MyProfile from './components/profile/MyProfile.jsx';
// import SendCode from './components/login/SendVerificationCode.jsx';
// import ResetPassword from './components/login/ResetPassword.jsx';

export const UserContext = createContext();
export const RegisterContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/home'} />} />
          <Route path="home" element={<Home />}>
            <Route path=':category' element={<Products />} />
            <Route path=':category/:productId' element={<FullProduct />} />
            <Route path="profile" element={<Profile />}>
              <Route path="myProfile" element={<MyProfile />} />
              <Route path="myProducts" element={<MyProducts />} />
            </Route>
            <Route path="post" element={<ProductUploadForm />} />
          </Route>
          <Route path="*" element={<FailToLoadPage />} />
          <Route path="/auth/*" element={
            <RegisterContext.Provider value={[signup, setSignup]}>
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </RegisterContext.Provider>
          } />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
