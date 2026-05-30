import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/ShowUser.css";
import { useNavigate } from "react-router-dom";

export default function ShowUser() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/showuser",{
      withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="show-user-container">
      <div className="show-user-header">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
  Show Users
</h2>
    </div>
    <div>
        <button
          className="back-btn"
          onClick={() => navigate("/adminpanel/manageuser")}
        >
          Back
        </button>
      </div>

      <div className="user-grid">
        {user.length > 0 ? (
          user.map((u) => (
            <div className="user-card" key={u._id}>
              <h3>
                {u.first_name} {u.last_name}
              </h3>

              <p>
                <strong>Username:</strong> {u.user_name}
              </p>

              <p>
                <strong>Email:</strong> {u.email_id}
              </p>

              <p>
                <strong>Mobile:</strong> {u.mobile_no}
              </p>

              <p>
                <strong>City:</strong> {u.city}
              </p>

              <p>
                <strong>State:</strong> {u.state}
              </p>

              <p>
                <strong>Pin Code:</strong> {u.pin_code}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {u.status === 1 ? "Active" : "Inactive"}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(u.cdate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No Users Found</p>
        )}
      </div>
    </div>
  );
}