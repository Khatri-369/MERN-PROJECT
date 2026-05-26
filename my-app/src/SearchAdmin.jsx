import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/SearchAdmin.css";

export default function SearchAdmin() {
  const [search, setSearch] = useState("");
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

  const searchAdmin = async () => {
    if (!search.trim()) {
      toast.error("ENTER ADMIN NAME");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/admin/showadminsearch?search=${search}`
      );

      setAdmins(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("ADMIN NOT FOUND");
    }
  };

  return (
    <div className="search-admin-container">
      <h2>Search Admin</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter admin name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchAdmin}>Search</button>
      </div>

      <div className="admin-grid">
        {admins.map((item) => (
          <div className="admin-card" key={item._id}>
            <img src={item.profileImage} alt={item.name} />

            <h3>{item.name}</h3>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p>{item.gender}</p>
            <p>{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}