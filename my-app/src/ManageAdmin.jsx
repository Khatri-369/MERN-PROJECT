import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageAdmin.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/showadmin");
      setAdmins(response.data);
    } catch (error) {
      toast.error("Failed to fetch admins");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;     //NEW....!!!

    try {
      await axios.delete(`http://localhost:8000/admin/deleteadmin/${id}`);
      toast.success("Admin Deleted Successfully");
      fetchAdmins();
    } catch (error) {
      toast.error("Delete Failed");
      console.log(error);
    }
  };

  return (
    <div className="manage-admin-container">
      <div className="manage-admin-header">
        <h2>Manage Admins</h2>

        <Link to="/createadmin">
          <button>Add Admin</button>
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>PHOTO</th>
            <th>FULL NAME</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>MOBILE</th>
            <th>STATUS</th>
            <th>CREATED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr key={admin._id}>
                <td>
                  <img src={admin.photo} alt="admin" />
                </td>

                <td>{admin.fullname}</td>
                <td>{admin.username}</td>
                <td>{admin.emailid}</td>
                <td>{admin.mobileno}</td>

                <td>
                  <span
                    className={
                      admin.status === 1
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {admin.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{new Date(admin.cdate).toLocaleDateString()}</td> 

                <td className="action-buttons">
                  <Link to="/showadmin">
                    <button className="view-btn">View</button>
                  </Link>

                  <Link to={`/editadmin/${admin._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteAdmin(admin._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No Admin Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}