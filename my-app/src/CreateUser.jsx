import React, { useState } from "react";
import axios from "axios";
import "./css/UserForm.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const formData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    profileImage: "",
    address: "",
    birthdate: "",
    gender: "",
  };

  const [data, setdata] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/user/createuser", data);
      toast.success("USER CREATED SUCCESSFULLY");
      setdata(formData);
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO CREATE USER");
    }
  };

  return (
    <div className="form-container">
      <button onClick={()=>navigate("/")}>BACK</button>
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={data.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={data.profileImage}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={data.address}
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthdate"
          value={data.birthdate}
          onChange={handleChange}
        />

        <div className="radio-group">
          <label>Gender:</label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={data.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={data.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={data.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}