import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowAdmin.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ShowAdmin() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="show-admin-container">
      <div>
         <h2>Show Admins</h2>
      </div>
      <div className="admin-grid">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div className="admin-card" key={admin._id}>
              <img src={admin.photo} alt="admin" />

              <h3>{admin.fullname}</h3>

              <p>
                <strong>Username:</strong> {admin.username}
              </p>

              <p>
                <strong>Email:</strong> {admin.emailid}
              </p>

              <p>
                <strong>Mobile:</strong> {admin.mobileno}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {admin.status === 1 ? "Active" : "Inactive"}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(admin.cdate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No Admin Found</p>
        )}
      </div>
       <div className="show-admin-header">
        <button
          className="back-btn"
          onClick={() => navigate("/manageadmin")}
        >
          Back
        </button>
      </div>
    </div>
  );
}