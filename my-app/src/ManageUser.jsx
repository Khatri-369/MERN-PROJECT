import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageUser.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageUser() {
  const [user, setUser] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/showuser");
      setUser(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:8000/user/deleteuser/${id}`);
      toast.success("User Deleted Successfully");
      fetchUser();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="manage-user-container">
      <div className="manage-user-header">
        <h2>Manage Users</h2>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>FULL NAME</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>MOBILE</th>
            <th>CITY</th>
            <th>STATE</th>
            <th>PIN CODE</th>
            <th>STATUS</th>
            <th>CREATED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {user.length > 0 ? (
            user.map((u) => (
              <tr key={u._id}>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.user_name}</td>
                <td>{u.email_id}</td>
                <td>{u.mobile_no}</td>
                <td>{u.city}</td>
                <td>{u.state}</td>
                <td>{u.pin_code}</td>

                <td>
                  <span
                    className={
                      u.status === 1 ? "status-active" : "status-inactive"
                    }
                  >
                    {u.status === 1 ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>{new Date(u.cdate).toLocaleDateString()}</td>

                <td className="action-buttons">
                  <Link to="/adminpanel/showuser">
                    <button className="view-btn">
                      View
                    </button>
                  </Link>

                  <Link to={`/adminpanel/edituser/${u._id}`}>
                    <button className="edit-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
              </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No Users Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}