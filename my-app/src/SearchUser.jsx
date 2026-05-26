import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";  //IMPORT Toaster IN INDEX.JS   
import "./css/ShowUser.css";

export default function SearchUser(){
    const[search,setsearch] = useState("");
    const[dataa,setdata] = useState([]);

    useEffect(()=>{
        const getdata = async()=>{
            const value = await axios.get("http://localhost:8000/user/showuser");
            setdata(value.data);
        }
        getdata();
    },[]);

    const click = async()=>{
        try{
        const value = await axios.get(`http://localhost:8000/user/showuserbysearch?search=${search}`)
        setdata(value.data);
    }
    catch(error){
        console.log(error);
    }
    }

    return(
       <>
  <div className="userTableContainer">
    <div className="tableHeader">
      <div className="recordCount">
        Total Records: <span>{dataa.length}</span>
      </div>
    </div>

    <div className = "searchContainer">
      <input type = "text" placeholder="Search USERS..." onChange={(e) => {
        setsearch(e.target.value);
      }} />
      <input type="submit" onClick={click}/>
    </div>

    <div className="tableWrapper">
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
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
            dataa.map((user,index)=>{
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