import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/OrderForm.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateOrder() {
  const [order, setOrder] = useState({
    user: "",
    product: "",
    quantity: "",
    price: "",
    totalprice: "",
    deliveryaddress: "",
    orderstatus: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/order/showorderbyid/${id}`
      );

      setOrder({
        user: res.data.user,
        product: res.data.items[0].product,
        quantity: res.data.items[0].quantity,
        price: res.data.items[0].price,
        totalprice: res.data.totalprice,
        deliveryaddress: res.data.deliveryaddress,
        orderstatus: res.data.orderstatus
      });

    } catch (error) {
      console.log(error);
      toast.error("FAILED TO LOAD ORDER");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      user: order.user,
      items: [
        {
          product: order.product,
          quantity: Number(order.quantity),
          price: Number(order.price)
        }
      ],
      totalprice: Number(order.totalprice),
      deliveryaddress: order.deliveryaddress,
      orderstatus: order.orderstatus
    };

    try {
      await axios.put(
        `http://localhost:8000/order/updateorder/${id}`,
        updatedOrder
      );

      toast.success("ORDER UPDATED");
      navigate("/adminpanel/manageorder");

    } catch (error) {
      console.log(error);
      toast.error("UPDATE FAILED");
    }
  };

  return (
    <div className="order-form-container">
      <h2>Update Order</h2>

      <form className="order-form" onSubmit={submitForm}>
        <input
          type="text"
          name="user"
          value={order.user}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="product"
          value={order.product}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="quantity"
          value={order.quantity}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="price"
          value={order.price}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="totalprice"
          value={order.totalprice}
          onChange={inputHandler}
          required
        />

        <textarea
          name="deliveryaddress"
          value={order.deliveryaddress}
          onChange={inputHandler}
          required
        ></textarea>

        <input
          type="text"
          name="orderstatus"
          value={order.orderstatus}
          onChange={inputHandler}
          required
        />

        <button type="submit">Update Order</button>
      </form>
    </div>
  );
}