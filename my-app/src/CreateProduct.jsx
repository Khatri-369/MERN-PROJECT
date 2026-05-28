import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/CreateProduct.css";

export default function CreateProduct() {
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
    warranty: ""
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/product/createproduct",
        product
      );

      toast.success("Product Created Successfully");

      setProduct({
        productname: "",
        modelnumber: "",
        modelyear: "",
        productphoto: "",
        brandname: "",
        categoryname: "",
        color: "",
        weight: "",
        includedcomponent: "",
        warranty: ""
      });

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
          type="text"
          name="productphoto"
          placeholder="Product Photo URL"
          value={product.productphoto}
          onChange={inputHandler}
          required
        />

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