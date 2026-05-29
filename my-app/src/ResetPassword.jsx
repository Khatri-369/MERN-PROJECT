import React, { useState } from "react";
import axios from "axios";
import "./css/ResetPassword.css";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const [data, setData] = useState({
    email_id: location.state?.email_id,
    password: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };

  const resetPassword = async (e) => {

    e.preventDefault();

    if (
      data.password !== data.confirmpassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {

      await axios.post(
        "http://localhost:8000/user/resetpassword",
        {
          email_id: data.email_id,
          password: data.password
        }
      );

      toast.success(
        "Password Reset Successful"
      );

      navigate("/loginuser");

    } catch (error) {

      toast.error(
        "Something went wrong"
      );

    }

  };

  return (

    <div className="reset-container">

      <div className="reset-box">

        <h1>Reset Password</h1>

        <p>Create your new password</p>

        <form onSubmit={resetPassword}>

          <div className="input-group">

            <label>New Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={data.password}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm password"
              value={data.confirmpassword}
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit">
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );
}