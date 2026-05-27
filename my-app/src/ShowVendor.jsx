import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowVendor.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ShowVendor() {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/vendor/showvendor"
      );

      setVendors(res.data);

    } catch (error) {
      console.log(error);
      toast.error("FAILED TO LOAD VENDORS");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="show-vendor-container">
      <h2>All Vendors</h2>

      <table className="vendor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Address</th>
            <th>View</th>
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

              <td>
                <Link to={`/showvendorbyid/${vendor._id}`}>
                  <button className="view-btn">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}