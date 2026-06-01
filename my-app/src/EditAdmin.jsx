import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/EditAdmin.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAdmin() {
  const [admin, setAdmin] = useState({
    fullname: "",
    username: "",
    password: "",
    emailid: "",
    mobileno: "",
    photo: "",
    status: 1
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/admin/showadmin/${id}`
        );
        setAdmin(response.data);
      } catch (error) {
        toast.error("Failed To Fetch Admin");
        console.log(error);
      }
    };

    fetchAdmin();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/admin/updateadmin/${id}`,
        admin
      );

      toast.success("Admin Updated Successfully");
      navigate("/adminpanel/manageadmin");

    } catch (error) {
      toast.error("Update Failed");
      console.log(error);
    }
  };

  return (
    <div className="edit-admin-container">
      <form className="edit-admin-form" onSubmit={submitForm}>
        <h2>Edit Admin</h2>

        <input
          type="text"
          name="fullname"
          value={admin.fullname}
          onChange={inputHandler}
          placeholder="Full Name"
          required
        />

        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={inputHandler}
          placeholder="Username"
          required
        />

        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={inputHandler}
          placeholder="Password"
          required
        />

        <input
          type="email"
          name="emailid"
          value={admin.emailid}
          onChange={inputHandler}
          placeholder="Email"
          required
        />

        <input
          type="text"
          name="mobileno"
          value={admin.mobileno}
          onChange={inputHandler}
          placeholder="Mobile Number"
          required
        />

        <input
          type="text"
          name="photo"
          value={admin.photo}
          onChange={inputHandler}
          placeholder="Photo URL"
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

        <button type="submit">Update Admin</button>
      </form>
    </div>
  );
}