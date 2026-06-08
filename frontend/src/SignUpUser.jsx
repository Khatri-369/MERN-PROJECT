import React, { useState } from "react";
import axios from "axios";
import "./css/UserSignUp.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUpUser() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    email_id: "",
    mobile_no: "",
    city: "",
    state: "",
    pin_code: "",
    photo: null,
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    setUser({
      ...user,
      photo: e.target.files[0]
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("user_name", user.user_name);
    formData.append("password", user.password);
    formData.append("email_id", user.email_id);
    formData.append("mobile_no", user.mobile_no);
    formData.append("city", user.city);
    formData.append("state", user.state);
    formData.append("pin_code", user.pin_code);
    if (user.photo) {
      formData.append("photo", user.photo);
    }

    try {
      await axios.post(
        "http://localhost:8000/user/createuser",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Registration Successful");
      navigate("/loginuser");

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
    alt="ecommerce"
    />

      <div className="overlay"></div>

      <div className="left-content">
        <h1>AMAZON SIGNUP</h1>

        <p>
          Discover varios household item of top brand
          delivered fast at your doorstep.
        </p>
      </div>

    </div>

    <div className="signup-right">

      <h2>Create Account</h2>

      <form onSubmit={registerUser}>

        <div className="form-row">

          <div className="input-group">
            <label>First Name</label>

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={user.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>

            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={user.last_name}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="form-row">

          <div className="input-group">
            <label>Username</label>

            <input
              type="text"
              name="user_name"
              placeholder="Username"
              value={user.user_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email_id"
              placeholder="Email Address"
              value={user.email_id}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="form-row">

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile_no"
              placeholder="Mobile Number"
              value={user.mobile_no}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="form-row">

          <div className="input-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="City"
              value={user.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>State</label>

            <input
              type="text"
              name="state"
              placeholder="State"
              value={user.state}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="input-group">
          <label>Pin Code</label>

          <input
            type="text"
            name="pin_code"
            placeholder="Pin Code"
            value={user.pin_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Profile Photo</label>

          <input
            type="file"
            name="photo"
            onChange={fileHandler}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="signup-btn">
          Create Account
        </button>

      </form>

      <p className="login-text">
        Already have an account?
        <span onClick={() => navigate("/loginuser")}>
          Login
        </span>
      </p>

    </div>

  </div>

</div>
);
}