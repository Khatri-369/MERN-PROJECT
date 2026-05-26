import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowProduct.css";
import toast from "react-hot-toast";

export default function ShowProduct() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/product/showproduct"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("FAILED TO LOAD PRODUCTS");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="show-product-container">
      <h2>All Products</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
          <img src={item.images[0]} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.brand}</p>
          <p>{item.category}</p>
          <p>₹{item.price}</p>
          <p>Stock: {item.stock}</p>
        </div>
        ))}
      </div>
    </div>
  );
}