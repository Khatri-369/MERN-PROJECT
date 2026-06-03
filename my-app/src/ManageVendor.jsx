import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageVendor.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageVendor() {
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

  const deleteVendor = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/vendor/deletevendor/${id}`
      );

      toast.success("VENDOR DELETED");
      fetchVendors();

    } catch (error) {
      console.log(error);
      toast.error("DELETE FAILED");
    }
  };

  return (
    <div className="manage-vendor-container">
      <h2>Manage Vendors</h2>

      <table className="manage-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.vendorname}</td>
              <td>{vendor.email}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.company}</td>

              <td>
                <Link to={`/adminpanel/updatevendor/${vendor._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => deleteVendor(vendor._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}