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
    warranty: ""
  });

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

    try {
      await axios.put(
        `http://localhost:8000/product/updateproduct/${id}`,
        product
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
          type="text"
          name="productphoto"
          value={product.productphoto}
          onChange={inputHandler}
          placeholder="Product Photo URL"
          required
        />

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