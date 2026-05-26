import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./css/UserForm.css";

export default function EditUser() {
  const values = {
    name: "",
    email: "",
    phone: "",
    profileImage: "",
    address: "",
    birthdate: "",
    gender: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState(values);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/showuserbyid/${id}`
        );

        setdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getdata();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/user/updateuser/${id}`,
        data
      );

      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit User</h2>

      <form onSubmit={SubmitForm}>
        <input type="text" name="name" value={data.name} onChange={handleChange} />
        <input type="email" name="email" value={data.email} onChange={handleChange} />
        <input type="text" name="phone" value={data.phone} onChange={handleChange} />
        <input type="text" name="profileImage" value={data.profileImage} onChange={handleChange} />
        <input type="text" name="address" value={data.address} onChange={handleChange} />
        <input type="date" name="birthdate" value={data.birthdate} onChange={handleChange} />

        <div className="radio-group">
          <label>Gender:</label>

          <label>
            <input type="radio" name="gender" value="Male"
              checked={data.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>

          <label>
            <input type="radio" name="gender" value="Female"
              checked={data.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>

          <label>
            <input type="radio" name="gender" value="Other"
              checked={data.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>

        <button type="submit" onClick={()=>navigate('/')}>Update User</button>
      </form>
    </div>
  );
}