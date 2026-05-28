import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/EditCategory.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
  const [category, setCategory] = useState({
    catname: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/category/showcategory/${id}`
        );

        setCategory(response.data);

      } catch (error) {
        toast.error("Failed To Fetch Category");
      }
    };

    fetchCategory();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setCategory({
      ...category,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/category/updatecategory/${id}`,
        category
      );

      toast.success("Category Updated Successfully");
      navigate("/managecategory");

    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="edit-category-container">
      <form className="edit-category-form" onSubmit={submitForm}>
        <h2>Edit Category</h2>

        <input
          type="text"
          name="catname"
          value={category.catname}
          onChange={inputHandler}
          placeholder="Category Name"
          required
        />

        <button type="submit">Update Category</button>
      </form>
    </div>
  );
}