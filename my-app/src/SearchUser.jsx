import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/SearchUser.css";
import toast from "react-hot-toast";

export default function SearchUser() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);

  useEffect(()=>{
          const getdata = async()=>{
              const value = await axios.get("http://localhost:8000/user/showuser");
              setUser(value.data);
          }
          getdata();
      },[]);

  const searchUser = async () => {
    if (!search.trim()) {
      toast.error("Enter user first name");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/user/searchuser?search=${search}`
      );

      setUser(response.data);

    } catch (error) {
      toast.error("User not found");
      setUser([]);
    }
  };

  return (
    <div className="search-user-container">
      <h2>Search User</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter user first name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchUser}>Search</button>
      </div>

      <div className="search-results">
        {user.length > 0 ? (
          user.map((u) => (
            <div className="search-card" key={u._id}>
              <h3>{u.first_name} {u.last_name}</h3>

              <p><strong>Username:</strong> {u.user_name}</p>
              <p><strong>Email:</strong> {u.email_id}</p>
              <p><strong>Mobile:</strong> {u.mobile_no}</p>
              <p><strong>City:</strong> {u.city}</p>
              <p><strong>State:</strong> {u.state}</p>
              <p><strong>Pin Code:</strong> {u.pin_code}</p>
              <p>
                <strong>Status:</strong>{" "}
                {u.status === 1 ? "Active" : "Inactive"}
              </p>
            </div>
          ))
        ) : (
          <p>No Result</p>
        )}
      </div>
    </div>
  );
}