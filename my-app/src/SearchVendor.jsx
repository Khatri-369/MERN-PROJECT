import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/ShowVendor.css";
import toast from "react-hot-toast";

export default function SearchVendor() {
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);

    useEffect(()=>{
          const getdata = async()=>{
              const value = await axios.get("http://localhost:8000/vendor/showvendor");
              setVendors(value.data);
          }
          getdata();
      },[]);

  const searchVendor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/vendor/searchvendor?search=${search}`
      );

      setVendors(res.data);

    } catch (error) {
      console.log(error);
      toast.error("VENDOR NOT FOUND");
      setVendors([]);
    }
  };

  return (
    <div className="show-vendor-container">
      <h2>Search Vendor</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search vendor by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />

        <button
          onClick={searchVendor}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorname}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.company}</td>
              <td>{vendor.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}