import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ManageProduct.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ManageProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/product/deleteproduct/${id}`
      );

      toast.success("PRODUCT DELETED");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("DELETE FAILED");
    }
  };

  return (
    <div className="manage-product-container">
      <h2>Manage Products</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>{item.stock}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/editproduct/${item._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}