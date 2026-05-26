import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./css/ManageAdmin.css";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/showadmin");
      setAdmins(res.data);
    } catch (error) {
      toast.error("FAILED TO LOAD ADMINS");
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/admin/deleteadmin/${id}`);
      toast.success("ADMIN DELETED");
      getAdmins();
    } catch (error) {
      toast.error("DELETE FAILED");
    }
  };

  return (
    <div className="manage-admin-container">
      <h2>Manage Admins</h2>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.profileImage} alt={item.name} />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
              <td>
                <Link to={`/editadmin/${item._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteAdmin(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}