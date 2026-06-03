import React, { useState, useEffect } from "react";
import './Header.css';
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaMapMarkerAlt, FaCaretDown } from "react-icons/fa";

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState();

  // Update the input field if the URL query parameter changes (e.g. going back or page refresh)
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ search: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      {/* LOGO */}
      <Link to="/" className="header-logo">
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" className="logo" />
        <span className="logo-text">.in</span>
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="search-button">
          <FaSearch />
        </button>
      </div>

      {/* Cart */}
      <Link to="/showcart" className="header-item cart-container">
        <div className="cart-icon-wrapper">
          <span className="cart-count">0</span>
          <FaShoppingCart className="cart-icon" />
        </div>
        <span className="cart-text">Cart</span>
      </Link>

      {/* Right Navigation Items */}
      <div className="header-right">
        {/* Account Info */}
        <Link to="/profile" className="header-item account-info">
          <img
            src="https://i.imgur.com/HeIi0wU.png"
            alt="Profile"
            className="profile-img"
          />
        </Link>
      </div>

    </header>
  )
}