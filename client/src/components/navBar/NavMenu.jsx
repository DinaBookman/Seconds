import { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UserContext } from '../../App';
import './Navbar.css'; 
import { LuLogIn } from "react-icons/lu";
import { RiAdvertisementFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
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
          <p className="logo">SECONDS</p>
          <ul className={`navMenu ${isActive ? 'active' : ''}`}>
            
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
            {!currentUser ? (
              <li onClick={removeActive}>
                <NavLink to="/auth/login"><LuLogIn size={30}/></NavLink>
              </li>
            ) : (
              <li
                className={`nav-item ${dropdownActive ? 'active' : ''}`}
                onMouseEnter={toggleDropdown}
                onMouseLeave={toggleDropdown}
                onClick={toggleDropdown}
              >
                <NavLink  className="nav-link"><CgProfile size={30} /></NavLink>
                <div className="dropdown-menu">
                  <NavLink to="profile/myProfile" className="dropdown-item">My Profile</NavLink>
                  <NavLink to="profile/myProducts" className="dropdown-item">My Products</NavLink>
                  <NavLink to="/logout" className="dropdown-item">Logout</NavLink>
                </div>
              </li>
            )}
            <li onClick={removeActive}>
              <NavLink to="post"><RiAdvertisementFill size={30} /></NavLink>
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
