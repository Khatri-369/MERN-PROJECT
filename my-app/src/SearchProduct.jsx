import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/SearchProduct.css";
import toast from "react-hot-toast";

export default function SearchProduct() {
  const [searchh, setSearch] = useState("");
  const [products, setProducts] = useState([]);

    useEffect(()=>{
        const getdata = async()=>{
            const value = await axios.get("http://localhost:8000/product/showproduct");
            setProducts(value.data);
        }
        getdata();
    },[]);

  const searchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/product/searchproduct?search=${searchh}`
      );

      setProducts(res.data);
    } catch (error) {
  console.log(error.response?.data || error.message);
  toast.error("PRODUCT NOT FOUND");
}
  };

  return (
    <div className="search-product-container">
      <h2>Search Product</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter product name..."
          value={searchh}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchProduct}>Search</button>
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
            <img src={item.images[0]} alt={item.name} />

            <h3>{item.name}</h3>
            <p>{item.brand}</p>
            <p>₹{item.price}</p>
            <p>{item.seller}</p>
          </div>
        ))}
      </div>
    </div>
  );
}