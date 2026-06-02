import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function HomePage() {
    const [vendor, setVendor] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const inputHandler = (e) => {
        setVendor({
            ...vendor,
            [e.target.name]: e.target.value
        });
    };

    return(
        <div className="vendor-form-container">
            <h2>Create Vendor</h2>
            <form className="vendor-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Vendor Name"
                    value={vendor.name}
                    onChange={inputHandler}
                    required
                />  
                <input
                    type="email"
                    name="email"
                    placeholder="Vendor Email"  
                    value={vendor.email}    
                    onChange={inputHandler}
                    required
                />
                <input
                    type="text"
                    name="phone"        
                    placeholder="Vendor Phone"  
                    value={vendor.phone}    
                    onChange={inputHandler}
                    required    
                />
                <button type="submit">Create Vendor</button>
            </form>
        </div>
    );
}