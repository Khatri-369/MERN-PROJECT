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

    const handlestatus = async(id,status)=>{
    try{
        await axios.put(`http://localhost:8000/admin/updateadmin/${id}`,{status:status});
        fetchAdmins();

        toast.success(status===0?"USER BLOCKED":"USER UNBLOCKED");
    }
    catch(error){
         toast.error("Error updating user");
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="manage-admin-container">
      <div className="manage-admin-header">
        <h2>Status Admins</h2>
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
                  <button
                    className="block-btn"
                    onClick={() => handlestatus(admin._id,0)}
                  >
                    BLOCK
                  </button>
                   <button
                    className="unblock-btn"
                    onClick={() => handlestatus(admin._id,1)}
                  >
                    UNBLOCK
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