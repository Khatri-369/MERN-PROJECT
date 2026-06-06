import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/SearchProduct.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SearchProduct() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const getdata = async () => {
      const value = await axios.get("http://localhost:8000/product/showproduct");
      setProduct(value.data);
    }
    getdata();
  }, []);

  const searchProduct = async () => {
    if (!search.trim()) {
      toast.error("Enter product name");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/product/searchproduct?search=${search}`
      );

      setProduct(response.data);

    } catch (error) {
      toast.error("Product Not Found");
      setProduct([]);
      console.log(error);
    }
  };

  return (
    <div className="search-product-container">
      <div className="search-product-header">
        <h2>Search Product</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/adminpanel/manageproduct")}
        >
          Back
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchProduct}>Search</button>
      </div>

      <div className="search-results">
        {product.length > 0 ? (
          product.map((p) => (
            <div className="search-card" key={p._id}>
              <img src={p.productphoto[0]} alt="product"

              />
              <h3>{p.productname}</h3>
              <p><strong>Model No:</strong> {p.modelnumber}</p>
              <p><strong>Year:</strong> {p.modelyear}</p>
              <p><strong>Brand:</strong> {p.brandname}</p>
              <p><strong>Category:</strong> {p.categoryname}</p>
              <p><strong>Color:</strong> {p.color}</p>
              <p><strong>Weight:</strong> {p.weight}</p>
              <p><strong>Included:</strong> {p.includedcomponent}</p>
              <p><strong>Warranty:</strong> {p.warranty}</p>
              <p><strong>Price:</strong> ₹{p.price}</p>
            </div>
          ))
        ) : (
          <p>No Result</p>
        )}
      </div>
    </div>
  );
}