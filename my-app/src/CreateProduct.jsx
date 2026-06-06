import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/CreateProduct.css";

export default function CreateProduct() {
  const [product, setProduct] = useState({
    productname: "",
    modelnumber: "",
    modelyear: "",
    brandname: "",
    categoryname: "",
    color: "",
    weight: "",
    includedcomponent: "",
    warranty: "",
    price: ""
  });
  const [productphotos, setProductphotos] = useState([]);

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (productphotos.length === 0) {
      toast.error("Please select at least one product photo");
      return;
    }

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

    productphotos.forEach(file => {
      formData.append("productphoto", file);
    });

    try {
      await axios.post(
        "http://localhost:8000/product/createproduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Product Created Successfully");

      setProduct({
        productname: "",
        modelnumber: "",
        modelyear: "",
        brandname: "",
        categoryname: "",
        color: "",
        weight: "",
        includedcomponent: "",
        warranty: "",
        price: ""
      });
      setProductphotos([]);
      // Reset the file input element manually
      document.getElementById("productphoto-input").value = "";

    } catch (error) {
      toast.error("Create Failed");
      console.log(error);
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={submitForm}>
        <h2>Create Product</h2>

        <input
          type="text"
          name="productname"
          placeholder="Product Name"
          value={product.productname}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="modelnumber"
          placeholder="Model Number"
          value={product.modelnumber}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="modelyear"
          placeholder="Model Year"
          value={product.modelyear}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={inputHandler}
          required
        />

        <div>
          <label htmlFor="productphoto">
            Product Photos
          </label>

          <input
            id="productphoto"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setProductphotos([...e.target.files])}
          />
        </div>

        <input
          type="text"
          name="brandname"
          placeholder="Brand Name"
          value={product.brandname}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="categoryname"
          placeholder="Category Name"
          value={product.categoryname}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={product.color}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={product.weight}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="includedcomponent"
          placeholder="Included Component"
          value={product.includedcomponent}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="warranty"
          placeholder="Warranty"
          value={product.warranty}
          onChange={inputHandler}
          required
        />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}