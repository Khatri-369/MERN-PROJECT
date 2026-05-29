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
    status: 1,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/user/createuser", user);

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
        status: 1
      });

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