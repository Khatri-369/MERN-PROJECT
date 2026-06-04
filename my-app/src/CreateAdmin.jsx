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
    photo: null, // Change default from "" to null
    status: 1
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const fileHandler = (e) => {
    setAdmin({ ...admin, photo: e.target.files[0] });
  };
  const submitForm = async (e) => {
    e.preventDefault();

    // new FormData() creates an object that stores form fields and files in the multipart/form-data format.
    // It is used to send files to the backend server.
    const formData = new FormData();
    formData.append("fullname", admin.fullname);
    formData.append("username", admin.username);
    formData.append("password", admin.password);
    formData.append("emailid", admin.emailid);
    formData.append("mobileno", admin.mobileno);
    if (admin.photo) {
      formData.append("photo", admin.photo);
    }
    formData.append("status", admin.status);

    try {
      await axios.post("http://localhost:8000/admin/createadmin", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Admin Created Successfully");

      setAdmin({
        fullname: "",
        username: "",
        password: "",
        emailid: "",
        mobileno: "",
        photo: null,
        status: 1
      });

      // Clear the file input visually
      const fileInput = document.getElementById("photo-input");
      if (fileInput) fileInput.value = "";

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
          type="file"
          id="photo-input"
          name="photo"
          onChange={fileHandler}
          accept="image/*"
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