import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left side "All" hamburger */}
      <div className="nav-left">
        <FaBars className="hamburger-icon" />
        <span>All</span>
      </div>

      {/* Main Categories Navigation links */}
      <div className="nav-links">
        <Link to="/showproduct">Today's Deals</Link>
        <Link to="/showproduct">Electronics</Link>
        <Link to="/showproduct">Fashion</Link>
        <Link to="/showproduct">Mobiles</Link>
        <Link to="/showproduct">Home & Kitchen</Link>
        <Link to="/showproduct">Books</Link>
        <Link to="/showproduct">Computers</Link>
        <Link to="/showproduct">New Releases</Link>
        <Link to="/showproduct">Customer Service</Link>
        <Link to="/showproduct">Prime</Link>
      </div>

      {/* Right-aligned promo ad banner */}
      <div className="nav-promo">
        <Link to="/showproduct" className="promo-text">
          Shop Great Deals Now | Prime Video: Watch New Releases
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
