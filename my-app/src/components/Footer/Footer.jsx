import React from "react";
import "./Footer.css";

function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      {/* Back to Top */}
      <div className="footer-top" onClick={handleScrollToTop}>
        <button type="button">Back to top</button>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <a href="/">About Us</a>
          <a href="/">Careers</a>
          <a href="/">Press Releases</a>
          <a href="/">Amazon Science</a>
        </div>

        <div className="footer-section">
          <h3>Connect with Us</h3>
          <a href="/">Facebook</a>
          <a href="/">Twitter</a>
          <a href="/">Instagram</a>
        </div>

        <div className="footer-section">
          <h3>Make Money with Us</h3>
          <a href="/">Sell on Amazon</a>
          <a href="/">Protect & Build Your Brand</a>
          <a href="/">Amazon Global Selling</a>
          <a href="/">Become an Affiliate</a>
          <a href="/">Fulfillment by Amazon</a>
        </div>

        <div className="footer-section">
          <h3>Let Us Help You</h3>
          <a href="/">COVID-19 and Amazon</a>
          <a href="/">Your Account</a>
          <a href="/">Returns Centre</a>
          <a href="/">100% Purchase Protection</a>
          <a href="/">Amazon App Download</a>
          <a href="/">Help</a>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="footer-bottom">
        <div className="footer-bottom-logo">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon"
            className="footer-logo-img"
          />
        </div>
        <div className="footer-bottom-links">
          <a href="/">Conditions of Use</a>
          <a href="/">Privacy Notice</a>
          <a href="/">Interest-Based Ads</a>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates. Custom layout by Khatri Om Kumar.</p>
      </div>
    </footer>
  );
}

export default Footer;
