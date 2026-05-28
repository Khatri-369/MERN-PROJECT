import React, { useState } from "react";
import axios from "axios";
import "./css/CreateAdmin.css";
import toast from "react-hot-toast";

export default function CreateAdmin() {
  const [admin, setAdmin] = useState({
    fullname: "",
    username: "",
    password: "",
    emailid: "",
    mobileno: "",
    photo: "",
    status: 1
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/admin/createadmin", admin);

      toast.success("Admin Created Successfully");

      setAdmin({
        fullname: "",
        username: "",
        password: "",
        emailid: "",
        mobileno: "",
        photo: "",
        status: 1
      });

    } catch (error) {
      toast.error("Failed To Create Admin");
      console.log(error);
    }
  };

  return (
    <div className="admin-form-container">
      <form className="admin-form" onSubmit={submitForm}>
        <h2>Create Admin</h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={admin.fullname}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={admin.username}
          onChange={inputHandler}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={inputHandler}
          required
        />

        <input
          type="email"
          name="emailid"
          placeholder="Email"
          value={admin.emailid}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="mobileno"
          placeholder="Mobile Number"
          value={admin.mobileno}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={admin.photo}
          onChange={inputHandler}
          required
        />

        <select
          name="status"
          value={admin.status}
          onChange={inputHandler}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
}