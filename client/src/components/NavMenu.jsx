import { useState } from 'react'
import  styles from '../components/Home.module.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet, NavLink } from "react-router-dom"
function Navbar() {
  // adding the states 
  const [isActive, setIsActive] = useState(false);
  //add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };
  //clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <nav className={`${styles.navbar}`}>
            
          <p className={`${styles.logo}`}>Seconds</p>
          <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            <li onClick={removeActive}>
            <NavLink to="connect">Connect</NavLink><br />
            
            </li>
            <li onClick={removeActive}>
            <NavLink to="sofas">Sofas</NavLink><br />
            </li>
            <li onClick={removeActive}>
            <NavLink to="tables">Tables</NavLink><br />
            </li>
            <li onClick={removeActive}>
            <NavLink to="chairs">Chairs</NavLink><br />
            </li>
            <li onClick={removeActive}>
            <NavLink to="closets">Closets</NavLink><br />
            </li>
            <li onClick={removeActive}>
            <NavLink to="all">All</NavLink><br />
            </li>
            <li onClick={removeActive}>
            <NavLink to="post">Post Add</NavLink><br />
            </li>
          </ul>
          <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Navbar;
;