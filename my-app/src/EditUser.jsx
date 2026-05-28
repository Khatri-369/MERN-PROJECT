import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./css/EditUser.css";

export default function EditUser() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    email_id: "",
    mobile_no: "",
    city: "",
    state: "",
    pin_code: "",
    status: 1
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/user/showuser/${id}`)
      .then((res) => setUser(res.data));
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:8000/user/updateuser/${id}`, user);
    toast.success("Updated");
    navigate("/manageuser");
  };

  return (
    <form onSubmit={submitForm}>
      <input name="first_name" value={user.first_name} onChange={inputHandler} />
      <input name="last_name" value={user.last_name} onChange={inputHandler} />
      <input name="user_name" value={user.user_name} onChange={inputHandler} />
      <input name="password" value={user.password} onChange={inputHandler} />
      <input name="email_id" value={user.email_id} onChange={inputHandler} />
      <input name="mobile_no" value={user.mobile_no} onChange={inputHandler} />
      <input name="city" value={user.city} onChange={inputHandler} />
      <input name="state" value={user.state} onChange={inputHandler} />
      <input name="pin_code" value={user.pin_code} onChange={inputHandler} />

      <select name="status" value={user.status} onChange={inputHandler}>
        <option value={1}>Active</option>
        <option value={0}>Inactive</option>
      </select>

      <button>Update User</button>
    </form>
  );
}