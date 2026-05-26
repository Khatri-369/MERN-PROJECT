import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowAdmin.css";
import toast from "react-hot-toast";

export default function ShowAdmin() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/showadmin");
        setAdmins(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
        toast.error("FAILED TO LOAD ADMINS");
      }
    };

    getAdmins();
  }, []);

  return (
    <div className="show-admin-container">
      <h2>All Admins</h2>

      <div className="admin-grid">
        {admins.map((item) => (
          <div className="admin-card" key={item._id}>
            <img
              src={item.profileImage}
              alt={item.name}
            />

            <h3>{item.name}</h3>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Role:</strong> {item.role}</p>
            <p><strong>Address:</strong> {item.address}</p>
            <p>
              <strong>Birthdate:</strong>{" "}
              {new Date(item.birthdate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}