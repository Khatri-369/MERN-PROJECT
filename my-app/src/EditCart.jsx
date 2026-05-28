import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/EditCart.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCart() {
  const [cart, setCart] = useState({
    product_id: "",
    user_id: "",
    quantity: "",
    cart_status: 1
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/showcart/${id}`
        );

        setCart(response.data);

      } catch (error) {
        toast.error("Failed To Fetch Cart");
      }
    };

    fetchCart();
  }, [id]);

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
      await axios.put(
        `http://localhost:8000/cart/updatecart/${id}`,
        cart
      );

      toast.success("Cart Updated Successfully");
      navigate("/managecart");

    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="edit-cart-container">
      <form className="edit-cart-form" onSubmit={submitForm}>
        <h2>Edit Cart</h2>

        <input
          type="text"
          name="product_id"
          value={cart.product_id}
          onChange={inputHandler}
          placeholder="Product ID"
          required
        />

        <input
          type="text"
          name="user_id"
          value={cart.user_id}
          onChange={inputHandler}
          placeholder="User ID"
          required
        />

        <input
          type="text"
          name="quantity"
          value={cart.quantity}
          onChange={inputHandler}
          placeholder="Quantity"
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

        <button type="submit">Update Cart</button>
      </form>
    </div>
  );
}