import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/ShowOrder.css";
import toast from "react-hot-toast";

export default function ShowOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/order/showorder"
      );

      setOrders(res.data);

    } catch (error) {
      console.log(error);
      toast.error("FAILED TO LOAD ORDERS");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="show-order-container">
      <h2>Past Orders</h2>

      <table className="order-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>

    <tbody>
        {orders.map((item) =>
          item.items.map((productItem, index) => (
            <tr key={`${item._id}-${index}`}>
              <td>{item.user}</td>
              <td>{productItem.product}</td>
              <td>{productItem.quantity}</td>
              <td>₹{productItem.price}</td>
              <td>₹{productItem.price * productItem.quantity}</td>
              <td>{item.deliveryaddress}</td>
              <td>{item.orderstatus}</td>
            </tr>
          ))
        )}
    </tbody>
    
      </table>
    </div>
  );
}