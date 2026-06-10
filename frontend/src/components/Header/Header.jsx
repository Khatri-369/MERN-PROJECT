import React, { useState, useEffect } from "react";
import axios from "axios";
import './Header.css';
import { Link, useSearchParams } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaMapMarkerAlt, FaCaretDown } from "react-icons/fa";

export default function Header({ cartUpdated }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [profileimage, setprofileimage] = useState("");

  // Update the input field if the URL query parameter changes (e.g. going back or page refresh)
  useEffect(() => {
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (searchValue = query) => { //IF WE DONT PASS ANY PARAMETER IT TAKES QUERY AS DEFAULT
    if (searchValue.trim()) {
      setSearchParams({ search: searchValue.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cart/showonecart");
        setCartCount(response.data.length);
      } catch (error) {
        console.error("Error loading cart count:", error);
        setCartCount(0);
      }
    };
    fetchCartCount();
  }, [cartUpdated]);

  useEffect(() => {
    const fetchphotoUrl = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/showoneuser");
        if (response.data && response.data.photo) {
          setprofileimage(response.data.photos);
        }
      } catch (error) {
        console.log("Error Loading profile image:", error);
      }
    };
    fetchphotoUrl();
  }, []);

  return (
    <header className="header">
      {/* LOGO */}
      <Link to="/homepage" className="header-logo">
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
        <select className="search-select" onChange={(e) => { const value = e.target.value === "All Categories" ? "" : e.target.value; setQuery(value); handleSearch(value); }}>
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Home & Kitchen</option>
          <option>phone</option>
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
          <span className="cart-count">{cartCount}</span>
          <FaShoppingCart className="cart-icon" />
        </div>
        <span className="cart-text">Cart</span>
      </Link>

      {/* Right Navigation Items */}
      <div className="header-right">
        {/* Account Info */}
        <Link to="/profile" className="header-item account-info">
          <img
            src={profileimage ? `http://localhost:8000/uploads/${profileimage}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
            className="profile-img"
          />
        </Link>
      </div>

    </header>
  )
}