import React from 'react'
import './Navbar.css'
import image from '../assets/images.png'
import img2 from '../assets/search.png'
import img3 from '../assets/bell.png'
import img4 from '../assets/chat.png'
import {useState } from 'react';
// import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Nav = ({user}) => {

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
   
  };

  const logouthandle=()=>{
    localStorage.removeItem("token")
    location.reload()
  }

  const profilehandle = () => {
    navigate('/profile'); // Correctly use navigate
  };

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="nav-left">
        <img src={image} alt="Logo" className="logo" />
        <select className="location-dropdown">
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
      </div>

      {/* Center Section */}
      <div className="nav-center">
        <input
          type="text"
          className="search-input"
          placeholder="Find Cars, Mobile Phones and more..."
        />
        <button className="search-button">
          <img className='search-icon' src={img2} alt="search" />
        </button>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <button className="lang-button">
          ENGLISH <span>&#9662;</span>
        </button>
       
        <img className='chat-icon' src={img4} alt="" />
        <img className='bell-icon' src={img3} alt="" />
        <span className="navbar-name">{user}</span>
        <div className="profile-icon" onClick={handleDropdownToggle}></div>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={profilehandle}>
              Profile
            </button>
            <button className="dropdown-item" onClick={logouthandle}>
              Logout
            </button>
            
          </div>
        )}
        <button className="sell-button">
      + SELL
    </button>
      </div>
    </nav>
  );
};

export default Nav
