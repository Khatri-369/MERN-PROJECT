import React, { useState } from "react";
import axios from "axios";
import "./css/ProductForm.css";
import toast from "react-hot-toast";

export default function CreateProduct() {
  const initialData = {
  name: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  images: ""
};

  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...data,
      images: data.images.split(",")
    };

    try {
      await axios.post(
        "http://localhost:8000/product/createproduct",
        productData
      );

      toast.success("PRODUCT CREATED SUCCESSFULLY");
      setData(initialData);
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO CREATE PRODUCT");
    }
  };

  return (
    <div className="product-form-container">
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
<input
  type="text"
  name="name"
  placeholder="Product Name"
  value={data.name}
  onChange={handleChange}
/>

<textarea
  name="description"
  placeholder="Description"
  value={data.description}
  onChange={handleChange}
/>

<input
  type="text"
  name="brand"
  placeholder="Brand"
  value={data.brand}
  onChange={handleChange}
/>

<input
  type="text"
  name="category"
  placeholder="Category"
  value={data.category}
  onChange={handleChange}
/>

<input
  type="number"
  name="price"
  placeholder="Price"
  value={data.price}
  onChange={handleChange}
/>

<input
  type="number"
  name="stock"
  placeholder="Stock"
  value={data.stock}
  onChange={handleChange}
/>

<input
  type="text"
  name="images"
  placeholder="Image URLs (comma separated)"
  value={data.images}
  onChange={handleChange}
/>
            <button type="submit">Create Product</button>
      </form>
    </div>
  );
}