import React from "react";
import Menu from "./Menu";
import CreateUser from "./CreateUser";
import "./css/AdminPanel.css";

export default function AdminPanel() {
  return (
    <div className="admin-panel">
      <Menu />
      <CreateUser />
    </div>
  );
}