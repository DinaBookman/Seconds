import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Navbar from '../navBar/NavMenu';
import { API_URL } from '../../env';

function Home() {
  const location = useLocation();
  const isHomePage = location.pathname === '/home'; 

  const images = [
    `${API_URL}/uploads/sofa.jpg`,
    `${API_URL}/uploads/table.jpg`,
    `${API_URL}/uploads/closet.jpg`,
    `${API_URL}/uploads/chair.jpg`,
    `${API_URL}/uploads/bed.png`,
  ];

  return (
    <>
      <Navbar />
      {isHomePage && (
        <Zoom
          scale={1.4}
          indicators={true}
          duration={3000}
          transitionDuration={1000}
          pauseOnHover={false}
        >
          {images.map((each, index) => (
            <div key={index} style={{ width: "100%", height: "75vh", overflow: "hidden" }}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                alt="Slide Image"
                src={each}
              />
            </div>
          ))}
        </Zoom>
      )}
      <Outlet />
    </>
  );
}

export default Home;
