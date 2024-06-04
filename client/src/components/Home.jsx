import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, NavLink } from "react-router-dom"
import style from  '../components/Home.module.css'
import Navbar from './NavMenu'
//import NavMenu from './NavMenu';
function Home() {
  return (
    <>
     <Navbar/>
     <Outlet/>
    </>
  )
} export default Home
