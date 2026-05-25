import React, { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";  //IMPORT Toaster IN INDEX.JS   
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Manageuser(){
      const [data,setdata] = useState([]);
      const navigate = useNavigate();
    
    useEffect(()=>{
        const retrive = async()=>{
            const user = await axios.get("http://localhost:5000/user/showuser");
            setdata(user.data);
        }
        retrive();
    },[]);

    const deleteuser = async(cid)=>{
        await axios.delete(`http://localhost:5000/user/deleteuser/${cid}`).then((response)=>{
            setdata((prevuser)=>prevuser.filter((user)=>user._id!==cid))
            toast.success(response.data.msg,{position:'top-right'});
        }).catch((error)=>{
            console.log(error);
        })
    }


     return(
        <div className='userTable'>
                  <center>
                        <h1
                            style={{
                                background: "linear-gradient(90deg, #ff6a00, #ee0979)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontSize: "40px",
                                fontWeight: "bold",
                                letterSpacing: "2px",
                                textTransform: "uppercase"
                            }}
                        >
                            Show All Food Items
                        </h1>
                    </center>  
                        
                    <h3 style={{color:'green'}}>Total Records: {data.length}</h3>
                    <table border={1} cellPadding={10} cellSpacing={0}>
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
                                <th>EDITS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((val,index)=>{
                                    return(
                                        <tr key={val._id}>
                                           <td>{index+1}</td>
                                         <td>{val.name}</td>
                                        <td>{val.email}</td>
                                    <td>{val.phone}</td>
                                 <td>{val.profileImage}</td>
                                    <td>{val.address}</td>
                               <td>{val.birthdate}</td>
                                  <td>{val.gender}</td>
                                             <td>{val.cdate}</td>
                                            <td>
                                                <td><button onClick={()=>deleteuser(val._id)}>DELETE</button></td>
                                                <td><button onClick={()=>navigate(`/edituser/${val._id}`)}>Edit</button></td>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
        </div>
    );
}