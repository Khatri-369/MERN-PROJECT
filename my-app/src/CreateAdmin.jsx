import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/CreateAdmin.css";

export default function CreateAdmin() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profileImage: "",
    address: "",
    birthdate: "",
    gender: "",
    role: "admin",
  });

  const inputHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const submitAdmin = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/admin/createadmin", admin);

      toast.success("ADMIN CREATED SUCCESSFULLY");

      setAdmin({
        name: "",
        email: "",
        password: "",
        phone: "",
        profileImage: "",
        address: "",
        birthdate: "",
        gender: "",
        role: "admin",
      });

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("FAILED TO CREATE ADMIN");
    }
  };

  return (
    <div className="create-admin-container">
      <div className="create-admin-card">
        <h2>Create Admin</h2>

        <form onSubmit={submitAdmin}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={admin.name}
            onChange={inputHandler}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={admin.email}
            onChange={inputHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={admin.password}
            onChange={inputHandler}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={admin.phone}
            onChange={inputHandler}
            required
          />

          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL"
            value={admin.profileImage}
            onChange={inputHandler}
            required
          />

          <textarea
            name="address"
            placeholder="Enter Address"
            value={admin.address}
            onChange={inputHandler}
            required
          />

          <input
            type="date"
            name="birthdate"
            value={admin.birthdate}
            onChange={inputHandler}
            required
          />

          <select
            name="gender"
            value={admin.gender}
            onChange={inputHandler}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            name="role"
            value={admin.role}
            onChange={inputHandler}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>

          <button type="submit">Create Admin</button>
        </form>
      </div>
    </div>
  );
}