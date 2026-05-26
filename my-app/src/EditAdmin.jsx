import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./css/CreateAdmin.css";

export default function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profileImage: "",
    address: "",
    birthdate: "",
    gender: "",
    role: ""
  });

  const inputHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getSingleAdmin = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/admin/showadminid/${id}`
        );

        setAdmin(res.data);
      } catch (error) {
        toast.error("FAILED TO LOAD ADMIN");
      }
    };

    getSingleAdmin();
  }, [id]);

  const updateAdmin = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/admin/updateadmin/${id}`,
        admin
      );

      toast.success("ADMIN UPDATED");
      navigate("/manageadmin");

    } catch (error) {
      toast.error("UPDATE FAILED");
    }
  };

  return (
    <div className="create-admin-container">
      <div className="create-admin-card">
        <h2>Edit Admin</h2>

        <form onSubmit={updateAdmin}>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={inputHandler}
          />

          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={inputHandler}
          />

          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={inputHandler}
          />

          <input
            type="text"
            name="phone"
            value={admin.phone}
            onChange={inputHandler}
          />

          <input
            type="text"
            name="profileImage"
            value={admin.profileImage}
            onChange={inputHandler}
          />

          <textarea
            name="address"
            value={admin.address}
            onChange={inputHandler}
          />

          <input
            type="date"
            name="birthdate"
            value={admin.birthdate?.split("T")[0]}
            onChange={inputHandler}
          />

          <select
            name="gender"
            value={admin.gender}
            onChange={inputHandler}
          >
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

          <button type="submit">Update Admin</button>
        </form>
      </div>
    </div>
  );
}