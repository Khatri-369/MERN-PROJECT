import React, { useState,useEffect } from "react";
import axios from "axios";
import "./css/ShowOrder.css";
import toast from "react-hot-toast";

export default function SearchOrder() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
          const getdata = async()=>{
              const value = await axios.get("http://localhost:8000/order/showorder");
              setOrders(value.data);
          }
          getdata();
    },[]);

  const searchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/order/searchorder?search=${search}`
      );

      setOrders(res.data);

    } catch (error) {
      console.log(error);
      toast.error("ORDER NOT FOUND");
      setOrders([]);
    }
  };

  return (
    <div className="show-order-container">
      <h2>Search Orders</h2>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by user name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />

        <button
          onClick={searchOrder}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item._id}>
              <td>{item.user}</td>
              <td>{item.items[0].product}</td>
              <td>{item.items[0].quantity}</td>
              <td>₹{item.items[0].price}</td>
              <td>₹{item.totalprice}</td>
              <td>{item.orderstatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}