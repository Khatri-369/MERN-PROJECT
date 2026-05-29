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

  const handlestatus = async(id,status)=>{
    try{
        await axios.put(`http://localhost:8000/user/updateuser/${id}`,{status:status});
        fetchUser();

        toast.success(status===0?"USER BLOCKED":"USER UNBLOCKED");
    }
    catch(error){
         toast.error("Error updating user");
    }
  }

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
                  <button
                    className="block-btn"
                    onClick={() => handlestatus(u._id,0)}
                  >
                    BLOCK
                  </button>
                   <button
                    className="unblock-btn"
                    onClick={() => handlestatus(u._id,1)}
                  >
                    UNBLOCK
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