import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";  //IMPORT Toaster IN INDEX.JS   
import "./css/ShowUser.css";

export default function ShowUser(){
    const [data,setdata] = useState([]);
    
    useEffect(()=>{
        const retrive = async()=>{
            const user = await axios.get("http://localhost:5000/user/showuser");
            setdata(user.data);
        }
        retrive();
    },[]);

    return(
       <>
  <div className="userTableContainer">
    <div className="tableHeader">
      <div className="recordCount">
        Total Records: <span>{data.length}</span>
      </div>
    </div>

    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>phone</th>
            <th>image</th>
            <th>address</th>
            <th>birthdate</th>
            <th>gender</th>
            <th>create Date</th>
          </tr>
        </thead>

        <tbody>
         {
            data.map((user,index)=>{
            return(
                <tr key={user._id}>
                   <td>{index+1}</td>
                   <td>{user.name}</td>
                   <td>{user.email}</td>
                   <td>{user.phone}</td>
                   <td>{user.profileImage}</td>
                   <td>{user.address}</td>
                   <td>{user.birthdate}</td>
                   <td>{user.gender}</td>
                   <td>{user.cdate}</td>
                </tr>
            );
            })
         }
        </tbody>
      </table>
    </div>
  </div>
</>
    )
}