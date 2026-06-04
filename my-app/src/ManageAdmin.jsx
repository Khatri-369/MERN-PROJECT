import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageAdmin.css";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ManageAdmin() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/showadmin");
      setAdmins(response.data);
    } catch (error) {
      toast.error(t("failedFetchAdmins"));
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const deleteAdmin = async (id) => {
    if (!window.confirm(t("deleteConfirm"))) return;     //NEW....!!!

    try {
      await axios.delete(`http://localhost:8000/admin/deleteadmin/${id}`);
      toast.success(t("adminDeletedSuccess"));
      fetchAdmins();
    } catch (error) {
      toast.error(t("deleteFailed"));
      console.log(error);
    }
  };

  return (
    <div className="manage-admin-container">
      <div className="manage-admin-header">
        <h2>{t("manageAdmins")}</h2>

        <div className="language-selector-wrapper" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="premium-lang-select"
          >
            <option value="en">{t("english")}</option>
            <option value="es">{t("spanish")}</option>
          </select>
        </div>

        <Link to="/adminpanel/createadmin">
          <button>{t("addAdmin")}</button>
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>{t("photo")}</th>
            <th>{t("fullName")}</th>
            <th>{t("username")}</th>
            <th>{t("email")}</th>
            <th>{t("mobile")}</th>
            <th>{t("status")}</th>
            <th>{t("createdDate")}</th>
            <th>{t("action")}</th>
          </tr>
        </thead>

        <tbody>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr key={admin._id}>
                <td>
                  <img 
                    src={admin.photo ? (admin.photo.startsWith("http") ? admin.photo : `http://localhost:8000/uploads/${admin.photo}`) : ""} 
                    alt="admin" 
                  />
                </td>

                <td>{admin.fullname}</td>
                <td>{admin.username}</td>
                <td>{admin.emailid}</td>
                <td>{admin.mobileno}</td>

                <td>
                  <span
                    className={
                      admin.status === 1
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {admin.status === 1 ? t("active") : t("inactive")}
                  </span>
                </td>

                <td>{new Date(admin.cdate).toLocaleDateString()}</td>

                <td className="action-buttons">
                  <Link to="/adminpanel/showadmin">
                    <button className="view-btn">{t("view")}</button>
                  </Link>

                  <Link to={`/adminpanel/editadmin/${admin._id}`}>
                    <button className="edit-btn">{t("edit")}</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteAdmin(admin._id)}
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">{t("noAdminFound")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}