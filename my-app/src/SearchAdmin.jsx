import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/SearchAdmin.css";
import toast from "react-hot-toast";

export default function SearchAdmin() {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(()=>{
          const getdata = async()=>{
              const value = await axios.get("http://localhost:8000/admin/showadmin");
              setAdmins(value.data);
          }
          getdata();
  },[]);

  const searchAdmin = async () => {
    if (!search.trim()) {
      toast.error("Enter admin name");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/admin/searchadmin?search=${search}`
      );

      setAdmins(response.data);
    } catch (error) {
      toast.error("Admin not found");
      setAdmins([]);
      console.log(error);
    }
  };

  return (
    <div className="search-admin-container">
      <h2>Search Admin</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter admin full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchAdmin}>Search</button>
      </div>

      <div className="search-results">
        {admins.length > 0 ? (
          admins.map((admin) => (
            <div className="search-card" key={admin._id}>
              <img 
                src={admin.photo ? (admin.photo.startsWith("http") ? admin.photo : `http://localhost:8000/uploads/${admin.photo}`) : ""} 
                alt="admin" 
              />

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
            </div>
          ))
        ) : (
          <p>No Results</p>
        )}
      </div>
    </div>
  );
}