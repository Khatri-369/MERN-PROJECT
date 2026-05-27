import React, { useState } from "react";
import axios from "axios";
import "./css/OrderForm.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
  const [order, setOrder] = useState({
    user: "",
    product: "",
    quantity: "",
    price: "",
    totalprice: "",
    deliveryaddress: ""
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const orderData = {
      user: order.user,
      items: [
        {
          product: order.product,
          quantity: Number(order.quantity),
          price: Number(order.price)
        }
      ],
      totalprice: Number(order.totalprice),
      deliveryaddress: order.deliveryaddress
    };

    try {
      await axios.post(
        "http://localhost:8000/order/createorder",
        orderData
      );

      toast.success("ORDER CREATED SUCCESSFULLY");

      navigate("/showorder");

    } catch (error) {
      console.log(error);
      toast.error("FAILED TO CREATE ORDER");
    }
  };

  return (
    <div className="order-form-container">
      <h2>Create Order</h2>

      <form className="order-form" onSubmit={submitForm}>
        <input
          type="text"
          name="user"
          placeholder="User Name"
          value={order.user}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={order.product}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={order.quantity}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={order.price}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="totalprice"
          placeholder="Total Price"
          value={order.totalprice}
          onChange={inputHandler}
          required
        />

        <textarea
          name="deliveryaddress"
          placeholder="Delivery Address"
          value={order.deliveryaddress}
          onChange={inputHandler}
          required
        ></textarea>

        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}