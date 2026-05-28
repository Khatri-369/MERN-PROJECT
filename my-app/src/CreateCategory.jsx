import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/CreateCategory.css";

export default function CreateCategory() {
  const [category, setCategory] = useState({
    catname: ""
  });

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
      await axios.post(
        "http://localhost:8000/category/createcategory",
        category
      );

      toast.success("Category Created Successfully");

      setCategory({
        catname: ""
      });

    } catch (error) {
      toast.error("Create Failed");
      console.log(error);
    }
  };

  return (
    <div className="category-form-container">
      <form className="category-form" onSubmit={submitForm}>
        <h2>Create Category</h2>

        <input
          type="text"
          name="catname"
          placeholder="Category Name"
          value={category.catname}
          onChange={inputHandler}
          required
        />

        <button type="submit">Create Category</button>
      </form>
    </div>
  );
}