import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowVendorById.css";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function ShowVendorById() {
  const [vendor, setVendor] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchVendor = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/vendor/showvendorbyid/${id}`
      );

      setVendor(res.data);
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO LOAD VENDOR");
    }
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  if (!vendor) {
    return <h2 className="loading">Loading Vendor...</h2>;
  }

  return (
    <div className="vendor-container">
      <div className="vendor-card">
        <h2>Vendor Details</h2>

        <div className="vendor-info">
          <p>
            <strong>Name:</strong> {vendor.vendorname}
          </p>

          <p>
            <strong>Email:</strong> {vendor.email}
          </p>

          <p>
            <strong>Phone:</strong> {vendor.phone}
          </p>

          <p>
            <strong>Address:</strong> {vendor.address}
          </p>

          <p>
            <strong>Created Date:</strong>{" "}
            {new Date(vendor.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/adminpanel/showvendor")}
        >
          Back
        </button>
      </div>
    </div>
  );
}