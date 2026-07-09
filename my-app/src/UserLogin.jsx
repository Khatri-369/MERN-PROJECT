import React, { useState } from "react";
import axios from "axios";
import "./css/UserLogin.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserLogin() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email_id: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {

      //SYNTAX : axios.post(url, data, config)
      const response = await axios.post(
      "http://localhost:8000/user/loginuser",
      user
    );

      toast.success("Login Successful");

      navigate("/userpanel");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

 return (
  <div className="login-container">

    <div className="login-box">

      <div className="login-left">

        <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1974&auto=format&fit=crop"
          alt="shopping"
        />

        <div className="overlay"></div>

        <div className="left-content">
          <h1>Welcome Back</h1>

          <p>
            Shop smarter with amazing deals,
            fast delivery and premium products.
          </p>
        </div>

      </div>

      <div className="login-right">

        <h2>Sign In</h2>

        <form onSubmit={loginUser}>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email_id"
              placeholder="Enter your email"
              value={user.email_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <div>
        <p className="signup-text">
          Don't have an account?

          <span onClick={() => navigate("/signupuser")}>
            Register
          </span>
        </p>
        
       <p className="signup-text">
          <span onClick={() => navigate("/forgotpassword")}>
            FORGOT PASSWORD
          </span>
        </p>
        </div>

      </div>

    </div>

  </div>
);
}