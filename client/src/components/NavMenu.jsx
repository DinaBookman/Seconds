import { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../App';
import './Navbar.css'; // Assuming you saved the CSS in Navbar.css

function Navbar() {
  const [currentUser] = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <p className="logo">Seconds</p>
          <ul className={`navMenu ${isActive ? 'active' : ''}`}>
            {!currentUser ? (
              <li onClick={removeActive}>
                <NavLink to="/auth/login">Connect</NavLink>
              </li>
            ) : (
              <li
                className={`nav-item ${dropdownActive ? 'active' : ''}`}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
                onClick={toggleDropdown}
              >
                <NavLink  className="nav-link">Profile</NavLink>
                <div className="dropdown-menu">
                  <NavLink to="profile/myProfile" className="dropdown-item">My Profile</NavLink>
                  <NavLink to="profile/myProducts" className="dropdown-item">My Products</NavLink>
                  <NavLink to="/logout" className="dropdown-item">Logout</NavLink>
                </div>
              </li>
            )}
            <li onClick={removeActive}>
              <NavLink to="sofas">Sofas</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to="tables">Tables</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to="chairs">Chairs</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to="closets">Closets</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to="beds">Beds</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to="all">All</NavLink>
            </li>
            <li onClick={removeActive}>
              <NavLink to="post">Post Add</NavLink>
            </li>
          </ul>
          <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleActiveClass}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
