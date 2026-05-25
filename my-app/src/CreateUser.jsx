import React, { useState } from "react";
import axios from "axios";
import "./css/UserForm.css";
import toast from "react-hot-toast";  //IMPORT Toaster IN INDEX.JS    

export default function CreateUser(){
const formData = { //SEE FIELDS IN THE FORM
    name : "",
    email : "",
    password : "",
    phone : "",
    profileImage : "",
    address : "",
    birthdate : ""
}

const[data,setdata] = useState(formData);

const handleChange = (e)=>{
    const{name,value} = e.target;
    setdata({...data,[name]:value});
}

const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const data = await axios.post("http://localhost:5000/user/createuser");  //SEE THE CORRECT API CALL
        toast.success("USER CREATED SUCCESSFULLY");
    }
    catch(error){
        console.log(error);
    }
}

return (
    <div className="form-container">
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={formData.profileImage}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="date"
          name="isVerified"
          placeholder="Is Verified"
          value={formData.birthdate}
          onChange={handleChange}
        />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}