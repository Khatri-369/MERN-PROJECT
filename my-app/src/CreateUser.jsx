import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/CreateUser.css";


export default function CreateUser() {
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
    status: 1,
  });


  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const fileHandler = (e) => {
    setUser({
      ...user,
      photo: e.target.files[0]
    });
  };

  
  const submitForm = async (e) => {
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
    formData.append("status", user.status);

    try {
      await axios.post("http://localhost:8000/user/createuser", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("User Created Successfully");

      setUser({
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
        status: 1
      });

      const fileInput = document.getElementById("photo-input");
      if (fileInput) fileInput.value = "";

    } catch (error) {
      toast.error(error.response?.data?.error || "Failed To Create User");
      console.log(error);
    }
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={submitForm}>
        <h2>Create User</h2>

        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={user.first_name}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={user.last_name}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="user_name"
          placeholder="Username"
          value={user.user_name}
          onChange={inputHandler}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={inputHandler}
          required
        />

        <input
          type="email"
          name="email_id"
          placeholder="Email"
          value={user.email_id}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="mobile_no"
          placeholder="Mobile Number"
          value={user.mobile_no}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={user.city}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={user.state}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="pin_code"
          placeholder="Pin Code"
          value={user.pin_code}
          onChange={inputHandler}
          required
        />

        <div className="file-input-group">
          <label htmlFor="photo-input">Profile Photo</label>
          <input
            type="file"
            id="photo-input"
            name="photo"
            onChange={fileHandler}
            accept="image/*"
            required
          />
        </div>

        <select
          name="status"
          value={user.status}
          onChange={inputHandler}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}