import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowProduct.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ShowProduct() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product/showproduct");
      setProduct(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="show-product-container">
      <div className="show-product-header">
        <h2>Show Products</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/adminpanel/manageproduct")}
        >
          Back
        </button>
      </div>

      <div className="product-grid">
        {product.length > 0 ? (
          product.map((p) => (
            <div className="product-card" key={p._id}>
              <img src={p.productphoto[0]} alt="product" />
              <h3>{p.productname}</h3>

              <p><strong>Model No:</strong> {p.modelnumber}</p>
              <p><strong>Year:</strong> {p.modelyear}</p>
              <p><strong>Brand:</strong> {p.brandname}</p>
              <p><strong>Category:</strong> {p.categoryname}</p>
              <p><strong>Color:</strong> {p.color}</p>
              <p><strong>Weight:</strong> {p.weight}</p>
              <p><strong>Included:</strong> {p.includedcomponent}</p>
              <p><strong>Warranty:</strong> {p.warranty}</p>
            </div>
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </div>
    </div>
  );
}