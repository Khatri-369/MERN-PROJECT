import React, { useState } from "react";
import axios from "axios";
import "./css/VendorForm.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateVendor() {
  const [vendor, setVendor] = useState({
    vendorname: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    password: ""
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/vendor/createvendor",
        vendor
      );

      toast.success("VENDOR CREATED SUCCESSFULLY");

      navigate("/showvendor");

    } catch (error) {
      console.log(error);
      toast.error("FAILED TO CREATE VENDOR");
    }
  };

  return (
    <div className="vendor-form-container">
      <h2>Create Vendor</h2>

      <form className="vendor-form" onSubmit={submitForm}>
        <input
          type="text"
          name="vendorname"
          placeholder="Vendor Name"
          value={vendor.vendorname}
          onChange={inputHandler}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={vendor.email}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={vendor.phone}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={vendor.company}
          onChange={inputHandler}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={vendor.address}
          onChange={inputHandler}
          required
        ></textarea>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={vendor.password}
          onChange={inputHandler}
          required
        />

        <button type="submit">Create Vendor</button>
      </form>
    </div>
  );
}