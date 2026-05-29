import React, { useState } from "react";
import axios from "axios";
import "./css/VerifyOTP.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function VerifyOTP() {

  const navigate = useNavigate();
  const location = useLocation();

   const email_id = location.state?.email_id;
   console.log(email_id);

  const [data, setData] = useState({
    email_id: email_id,
    otp: ""
  });

 

  //HANDLE CHANGE
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const verifyOTP = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8000/user/verifyotp",
        data
      );

      toast.success("OTP Verified");

      navigate("/resetpassword", {
        state: {
          email_id: data.email_id
        }
      });

    } catch (error) {

      toast.error(
        error.response.data.message
      );

    }

  };

  return (

    <div className="otp-container">

      <div className="otp-box">

        <h1>Verify OTP</h1>

        <p>
          Enter the OTP sent to email {email_id}
        </p>

        <form onSubmit={verifyOTP}>

          <div className="input-group">

            <label>OTP</label>

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={data.otp}
              onChange={handleChange}
              required
            />

          </div>

          <button type="submit">
            Verify OTP
          </button>

        </form>

      </div>

    </div>

  );
}