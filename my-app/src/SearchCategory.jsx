import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/SearchCategory.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SearchCategory() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

    useEffect(()=>{
          const getdata = async()=>{
              const value = await axios.get("http://localhost:8000/category/showcategory");
              setCategory(value.data);
          }
          getdata();
    },[]);
    
  const searchCategory = async () => {
    if (!search.trim()) {
      toast.error("Enter category name");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/category/searchcategory?search=${search}`
      );

      setCategory(response.data);

    } catch (error) {
      toast.error("Category Not Found");
      setCategory([]);
      console.log(error);
    }
  };

  return (
    <div className="search-category-container">
      <div className="search-category-header">
        <h2>Search Category</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/managecategory")}
        >
          Back
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by category name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchCategory}>Search</button>
      </div>

      <div className="search-results">
        {category.length > 0 ? (
          category.map((c) => (
            <div className="search-card" key={c._id}>
              <h3>{c.catname}</h3>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(c.cdate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No Result</p>
        )}
      </div>
    </div>
  );
}