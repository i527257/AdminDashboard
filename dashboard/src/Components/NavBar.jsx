import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './NavBar.css';
import fontysLogo from '../assets/Fontys.jpg';

const Navbar = () => {
  const { loggedInUser, logout } = useAuth();  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  
    navigate('/'); 
  };

  return (
    <nav className={`navbar ${loggedInUser ? '' : 'not-logged-in'}`}>
      <div className="navbar-left">
        <img 
          src={fontysLogo}
          alt="Fontys Logo"
          className="navbar-logo"
        />
      </div>

      <div className="navbar-right">
        {loggedInUser ? (
          <>
            <Link to="/search" className="navbar-link">Search</Link> {/* Add Search link */}
          <span className="navbar-username" style={{ cursor: 'not-allowed' }}>
            {loggedInUser.displayname} {/* Display the user's displayname */}
            </span>
          <button onClick={handleLogout} className="navbar-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="navbar-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
