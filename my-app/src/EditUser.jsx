import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";  //IMPORT Toaster IN INDEX.JS   
import { useNavigate } from "react-router-dom";
import { useParams,useNavigate } from "react-router-dom";

export default function EditUser(){

    const values = {
        name : "",
        email : "",
        password : "",
        phone : "",
        profileImage : "",
        address : "",
        birthdate : ""
    };

    const[data,setdata] = useState(values);
     
    const{id} = useParams();
    const navigate = useNavigate();
    
   useEffect(() => {
    const getdata = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/user/showuserbyid/${id}`
            );
            setdata(response.data);  
        } catch (error) {
            console.log(error);      
        }
    };
    getdata();
    }, [id]);

    const handleChange = (e)=>{
        const{name,value} = e.target;
        setdata({...data,[name]:value});
    }

    const SubmitForm= async(e)=>{
        e.preventDefault();
        await axios.put("http://localhost:5000/user/updateuser",data)
        .then((response)=>{toast.success(response.data.msg)})
        navigate("/")
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
    <div className="form-container">
      <h2>Create User</h2>

      <form onSubmit={SubmitForm}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={data.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="profileImage"
          placeholder="Profile Image URL"
          value={data.profileImage}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={data.address}
          onChange={handleChange}
        />

        <input
          type="date"
          name="isVerified"
          placeholder="Is Verified"
          value={data.birthdate}
          onChange={handleChange}
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
}