import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ProductForm.css";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

const [data, setData] = useState({
  name: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  stock: "",
  images: ""
});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/product/showproductbyid/${id}`
        );

        setData({
          ...res.data,
          images: res.data.images.join(",")
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/product/updateproduct/${id}`,
        {
          ...data,
          images: data.images.split(",")
        }
      );

      toast.success("PRODUCT UPDATED");
      navigate("/manageproduct");
    } catch (error) {
      console.log(error);
      toast.error("UPDATE FAILED");
    }
  };

  return (
    <div className="product-form-container">
      <h2>Edit Product</h2>

      <form onSubmit={updateProduct}>
       <input name="name" value={data.name} onChange={handleChange} />
        <textarea name="description" value={data.description} onChange={handleChange} />
        <input name="brand" value={data.brand} onChange={handleChange} />
        <input name="category" value={data.category} onChange={handleChange} />
        <input name="price" value={data.price} onChange={handleChange} />
        <input name="stock" value={data.stock} onChange={handleChange} />
        <input name="images" value={data.images} onChange={handleChange} />
        
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}