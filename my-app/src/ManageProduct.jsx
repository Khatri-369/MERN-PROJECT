import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageProduct.css";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ManageProduct() {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product/showproduct");
      setProduct(response.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:8000/product/deleteproduct/${id}`);
      toast.success("Product Deleted Successfully");
      fetchProduct();
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  return (
    <div className="manage-product-container">
      <div className="manage-product-header">
        <h2>Manage Products</h2>

        <Link to="/createproduct">
          <button>Add Product</button>
        </Link>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>PHOTO</th>
            <th>PRODUCT NAME</th>
            <th>MODEL NO</th>
            <th>YEAR</th>
            <th>BRAND</th>
            <th>CATEGORY</th>
            <th>COLOR</th>
            <th>WEIGHT</th>
            <th>WARRANTY</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          {product.length > 0 ? (
            product.map((p) => (
              <tr key={p._id}>
                <td>
                  <img src={p.productphoto} alt="product" />
                </td>

                <td>{p.productname}</td>
                <td>{p.modelnumber}</td>
                <td>{p.modelyear}</td>
                <td>{p.brandname}</td>
                <td>{p.categoryname}</td>
                <td>{p.color}</td>
                <td>{p.weight}</td>
                <td>{p.warranty}</td>

                <td className="action-buttons">
                  <Link to="/showproduct">
                    <button className="view-btn">View</button>
                  </Link>

                  <Link to={`/editproduct/${p._id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}