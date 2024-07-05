import React, { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, NavLink } from "react-router-dom"
// import style from  '../components/Home.module.css'
// import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Navbar from './navBar/NavMenu'
//import NavMenu from './NavMenu';
function Home() {
  const images = [
    "http://localhost:8080/uploads/download.png",
    "http://localhost:8080/uploads/download1.jpg",
    "http://localhost:8080/uploads/shopping.png",
    "http://localhost:8080/uploads/shopping (1).webp",
  ];
  return (
    <>
      <Navbar />
      <Zoom
        scale={1.4}
        indicators={true}
        duration={3000}
        transitionDuration={1000}
        pauseOnHover={false}  >
        {images.map((each, index) => (<div key={index} style={{ width: "100%", height: "75vh", overflow: "hidden" }}>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt="Slide Image"
            src={each}
          />
        </div>
        ))}
        </Zoom >
    <Outlet />
    </>
  )
} export default Home



// import React from 'react';
// import { Zoom } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';

// const ZoomInExample = () => {
//     const images = [
//         "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
//         "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//     ];

//     return (
//         <Zoom scale={1.4} indicators={true}>
//             {images.map((each, index) => (
//                 <div key={index} style={{ width: "100%" }}>
//                     <img style={{ objectFit: "cover", width: "100%" }} alt="Slide Image" src={each} />
//                 </div>
//             ))}
//         </Zoom>
//     );
// };

// export default ZoomInExample;
