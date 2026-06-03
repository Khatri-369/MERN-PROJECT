import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCaretDown
} from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="header-logo">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Amazon Logo"
          className="logo"
        />
        <span className="logo-country">.in</span>
      </Link>

      {/* Delivery */}
      <div className="header-location">
        <FaMapMarkerAlt className="location-icon" />
        <div className="location-text">
          <span className="line-one">Deliver to</span>
          <span className="line-two">Vadodara 390001</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="header-search">
        <select className="search-select">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Kitchen</option>
          <option>Mobiles</option>
          <option>Books</option>
          <option>Beauty</option>
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Search Amazon.in"
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      {/* Right Navigation Items */}
      <div className="header-right">
        {/* Language Selector */}
        <div className="header-item language-select">
          <span className="flag-emoji">🇮🇳</span>
          <span className="lang-text">EN</span>
          <FaCaretDown className="caret" />
        </div>

        {/* Account Info */}
        <Link to="/loginuser" className="header-item account-info">
          <span className="line-one">Hello, Sign in</span>
          <span className="line-two">
            Account & Lists <FaCaretDown className="caret" />
          </span>
        </Link>

        {/* Returns & Orders */}
        <div className="header-item returns-orders">
          <span className="line-one">Returns</span>
          <span className="line-two">& Orders</span>
        </div>

        {/* Cart */}
        <Link to="/showcart" className="header-item cart-container">
          <div className="cart-icon-wrapper">
            <span className="cart-count">0</span>
            <FaShoppingCart className="cart-icon" />
          </div>
          <span className="cart-text">Cart</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
