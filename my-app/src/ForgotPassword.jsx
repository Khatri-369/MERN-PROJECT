import React, { useState } from "react";
import axios from "axios";
import "./css/ForgotPassword.css";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email_id: "",
    mobile_no: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/user/forgotpassword",
        user
      );  
      toast.success("Reset link sent to your email");
    
        navigate("/verifyotp",{
        state:{
          email_id: user.email_id
        }
        });
    } 
    
    catch (error) {
      toast.error(error.response?.data?.message || error.response?.data?.error || "Email not found");
      console.log(error);
    }
  };

  return (
    <div className="forgot-container">

      <div className="forgot-box">

        <div className="forgot-left">

          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1974&auto=format&fit=crop"
            alt="shopping"
          />

          <div className="overlay"></div>

          <div className="left-content">
            <h1>Forgot Password?</h1>

            <p>
              Don't worry. Enter your email and
              we'll help you recover your account.
            </p>
          </div>

        </div>

        <div className="forgot-right">

          <h2>Reset Password</h2>

          <p className="subtitle">
            Enter your registered email address
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

  <label>Email Address</label>

  <input
    type="email"
    name="email_id"
    placeholder="Enter your email"
    value={user.email_id}
    onChange={(e) =>
      setUser({
        ...user,
        email_id: e.target.value,
      })
    }
    required
  />

</div>

<div className="input-group">

  <label>Mobile Number</label>

  <input
    type="text"
    name="mobile_no"
    placeholder="Enter mobile number"
    value={user.mobile_no}
    onChange={(e) =>
      setUser({
        ...user,
        mobile_no: e.target.value,
      })
    }
    required
  />

</div>

     <button type="submit" className="reset-btn">
          Send Reset Link
      </button>

          </form>

        </div>

      </div>

    </div>
  );
}