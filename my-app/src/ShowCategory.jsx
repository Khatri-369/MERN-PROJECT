import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowCategory.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ShowCategory() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/category/showcategory"
      );

      setCategory(response.data);

    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="show-category-container">
      <div className="show-category-header">
        <h2>Show Categories</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/managecategory")}
        >
          Back
        </button>
      </div>

      <div className="category-grid">
        {category.length > 0 ? (
          category.map((c) => (
            <div className="category-card" key={c._id}>
              <h3>{c.catname}</h3>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(c.cdate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No Categories Found</p>
        )}
      </div>
    </div>
  );
}