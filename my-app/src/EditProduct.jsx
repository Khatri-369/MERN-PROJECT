import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/EditProduct.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const [product, setProduct] = useState({
    productname: "",
    modelnumber: "",
    modelyear: "",
    productphoto: "",
    brandname: "",
    categoryname: "",
    color: "",
    weight: "",
    includedcomponent: "",
    warranty: "",
    price: ""
  });
  const [newPhotos, setNewPhotos] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/product/showproduct/${id}`
        );

        setProduct(response.data);

      } catch (error) {
        toast.error("Failed To Fetch Product");
      }
    };

    fetchProduct();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productname", product.productname);
    formData.append("modelnumber", product.modelnumber);
    formData.append("modelyear", product.modelyear);
    formData.append("brandname", product.brandname);
    formData.append("categoryname", product.categoryname);
    formData.append("color", product.color);
    formData.append("weight", product.weight);
    formData.append("includedcomponent", product.includedcomponent);
    formData.append("warranty", product.warranty);
    formData.append("price", product.price);
    if (newPhotos.length > 0) {
      newPhotos.forEach(file => {
        formData.append("productphoto", file);
      });
    }

    try {
      await axios.put(
        `http://localhost:8000/product/updateproduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Product Updated Successfully");
      navigate("/adminpanel/manageproduct");

    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="edit-product-container">
      <form className="edit-product-form" onSubmit={submitForm}>
        <h2>Edit Product</h2>

        <input
          type="text"
          name="productname"
          value={product.productname}
          onChange={inputHandler}
          placeholder="Product Name"
          required
        />

        <input
          type="text"
          name="modelnumber"
          value={product.modelnumber}
          onChange={inputHandler}
          placeholder="Model Number"
          required
        />

        <input
          type="number"
          name="modelyear"
          value={product.modelyear}
          onChange={inputHandler}
          placeholder="Model Year"
          required
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={inputHandler}
          placeholder="Price"
          required
        />

        {product.productphoto.length > 0 && (
          <div className="current-photos-preview" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span style={{ fontSize: "14px", color: "#64748b" }}>Current Photos:</span>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {product.productphoto.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`current product ${index + 1}`}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "12px", border: "1px solid #d1d5db" }}
                />
              ))}
            </div>
          </div>
        )}


        <div className="file-input-wrapper" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="productphoto-input" style={{ fontSize: "14px", color: "#64748b", paddingLeft: "5px" }}>
            Upload New Photos (Optional, replaces current photos)
          </label>
          <input
            id="productphoto-input"
            type="file"
            name="productphoto"
            accept="image/*"
            multiple
            onChange={(e) => setNewPhotos([...e.target.files])}
          />
        </div>

        <input
          type="text"
          name="brandname"
          value={product.brandname}
          onChange={inputHandler}
          placeholder="Brand Name"
          required
        />

        <input
          type="text"
          name="categoryname"
          value={product.categoryname}
          onChange={inputHandler}
          placeholder="Category Name"
          required
        />

        <input
          type="text"
          name="color"
          value={product.color}
          onChange={inputHandler}
          placeholder="Color"
          required
        />

        <input
          type="text"
          name="weight"
          value={product.weight}
          onChange={inputHandler}
          placeholder="Weight"
          required
        />

        <input
          type="text"
          name="includedcomponent"
          value={product.includedcomponent}
          onChange={inputHandler}
          placeholder="Included Component"
          required
        />

        <input
          type="text"
          name="warranty"
          value={product.warranty}
          onChange={inputHandler}
          placeholder="Warranty"
          required
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}