import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./css/CreateCart.css";

export default function CreateCart() {
  const [cart, setCart] = useState({
    product_id: "",
    user_id: "",
    quantity: "",
    cart_status: 1
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setCart({
      ...cart,
      [name]: value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/cart/createcart", cart);

      toast.success("Cart Created Successfully");

      setCart({
        product_id: "",
        user_id: "",
        quantity: "",
        cart_status: 1
      });

    } catch (error) {
      toast.error("Create Failed");
      console.log(error);
    }
  };

  return (
    <div className="cart-form-container">
      <form className="cart-form" onSubmit={submitForm}>
        <h2>Create Cart</h2>

        <input
          type="text"
          name="product_id"
          placeholder="Product ID"
          value={cart.product_id}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={cart.user_id}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          value={cart.quantity}
          onChange={inputHandler}
          required
        />

        <select
          name="cart_status"
          value={cart.cart_status}
          onChange={inputHandler}
        >
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>

        <button type="submit">Create Cart</button>
      </form>
    </div>
  );
}