import React, { useState } from "react";
import axios from "axios";
import "./css/UserSignUp.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUpAdmin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullname: "",
    username: "",
    password: "",
    emailid: "",
    mobileno: "",
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
  });

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const registerAdmin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/admin/createadmin",
        admin
      );

      toast.success("Admin Registration Successful");
      navigate("/loginadmin");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-left">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1974&auto=format&fit=crop"
            alt="admin panel background"
          />
          <div className="overlay"></div>
          <div className="left-content">
            <h1>AMAZON ADMIN</h1>
            <p>
              Access the administrator panel to manage systems,
              users, products, and configurations seamlessly.
            </p>
          </div>
        </div>

        <div className="signup-right">
          <h2>Admin Account</h2>
          <form onSubmit={registerAdmin}>
            <div className="form-row">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={admin.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={admin.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="emailid"
                  placeholder="Email Address"
                  value={admin.emailid}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={admin.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobileno"
                  placeholder="Mobile Number"
                  value={admin.mobileno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  value={admin.photo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="signup-btn">
              Create Admin Account
            </button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/loginadmin")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}