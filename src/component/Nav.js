import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import the modern account icon
import { useContext } from 'react';
import {MyContext} from './MyContext';

const Navbar = () => {
  const {isLogged,handleLogout,cartItemCount,searchQuery,setSearchQuery} = useContext(MyContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onClickHandler = () => {
    handleLogout();
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!isLogged) {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    navigate('/products'); // Navigate to the products page when searching
  };

  return (
    <nav className="navbar">
      <div className="logo">ShopEasy</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {isLogged && (
        <Link to="/cart" className="cart-icon" onClick={handleCartClick}>
          🛒 Cart
          {cartItemCount > 0 && <span className="cart-item-count">{cartItemCount}</span>}
        </Link>
      )}
      {!isLogged && (
        <div 
          className="account-icon" 
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <FaUserCircle size={28} />
          {isOpen && (
            <div className="account-dropdown">
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
      {isLogged && (
        <button className="logout-button" onClick={onClickHandler}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
