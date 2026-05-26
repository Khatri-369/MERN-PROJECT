import React, { useState } from "react";
import axios from "axios";
import "./css/CreateCart.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateCart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    user: "",
    product: "",
    quantity: "",
    price: "",
  });

  const inputHandler = (e) => {
    setCart({
      ...cart,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const totalprice = Number(cart.quantity) * Number(cart.price);

    const cartData = {
      user: cart.user,
      items: [
        {
          product: cart.product,
          quantity: cart.quantity,
          price: cart.price,
        },
      ],
      totalprice,
    };

    try {
      await axios.post("http://localhost:8000/cart/createcart", cartData);

      toast.success("Cart Added Successfully");
      navigate("/showcart");
    } catch (error) {
      toast.error("Failed to Add Cart");
      console.log(error);
    }
  };

  return (
    <div className="createcart-container">
      <form className="createcart-form" onSubmit={submitForm}>
        <h2>Create Cart</h2>

        <input
          type="text"
          name="user"
          placeholder="Enter User Name"
          value={cart.user}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="product"
          placeholder="Enter Product Name"
          value={cart.product}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Enter Quantity"
          value={cart.quantity}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={cart.price}
          onChange={inputHandler}
          required
        />

        <button type="submit">Create Cart</button>
      </form>
    </div>
  );
}