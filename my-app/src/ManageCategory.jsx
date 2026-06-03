import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageCategory.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageCategory() {
  const [category, setCategory] = useState([]);

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

  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(
        `http://localhost:8000/category/deletecategory/${id}`
      );

      toast.success("Category Deleted Successfully");
      fetchCategory();

    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="manage-category-container">
      <div className="manage-category-header">
        <h2>Manage Categories</h2>

        <Link to="/adminpanel/createcategory">
          <button>Add Category</button>
        </Link>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>CATEGORY NAME</th>
            <th>CREATED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {category.length > 0 ? (
            category.map((c) => (
              <tr key={c._id}>
                <td>{c.catname}</td>
                <td>{new Date(c.cdate).toLocaleDateString()}</td>

                <td className="action-buttons">
                  <Link to="/adminpanel/showcategory">
                    <button className="view-btn">View</button>
                  </Link>

                  <Link to={`/adminpanel/editcategory/${c._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Categories Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}