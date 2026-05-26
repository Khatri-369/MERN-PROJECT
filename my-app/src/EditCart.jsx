import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/EditCart.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCart() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const fetchSingleCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/showcartbyid/${id}`
        );

        setCart({
          user: response.data.user,
          product: response.data.items[0].product,
          quantity: response.data.items[0].quantity,
          price: response.data.items[0].price,
        });
      } catch (error) {
        toast.error("Failed to fetch cart");
      }
    };
    fetchSingleCart();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const totalprice = Number(cart.quantity) * Number(cart.price);

    const updatedCart = {
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
      await axios.put(
        `http://localhost:8000/cart/updatecart/${id}`,
        updatedCart
      );

      toast.success("Cart Updated Successfully");
      navigate("/showcart");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="editcart-container">
      <form className="editcart-form" onSubmit={submitForm}>
        <h2>Edit Cart</h2>

        <input
          type="text"
          name="user"
          value={cart.user}
          onChange={inputHandler}
          required
        />

        <input
          type="text"
          name="product"
          value={cart.product}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="quantity"
          value={cart.quantity}
          onChange={inputHandler}
          required
        />

        <input
          type="number"
          name="price"
          value={cart.price}
          onChange={inputHandler}
          required
        />

        <button type="submit">Update Cart</button>
      </form>
    </div>
  );
}