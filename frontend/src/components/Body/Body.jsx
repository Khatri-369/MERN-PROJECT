import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaPalette, 
  FaWeightHanging, 
  FaBoxOpen, 
  FaShieldAlt, 
  FaTag,
  FaShoppingCart
} from "react-icons/fa";
import "./Body.css";

export default function Body({ setCartUpdated }) {
    //ADD TO CART FUNCTIONALITY
    //USERID WE NEED TO FETCH FROM COOKIE OR LOCAL STORAGES                                       ///IMPORTANT///
    const HandleAddToCart = async (productId)=>{
        try{
            const response = await axios.post("http://localhost:8000/cart/createcart", {
                product_id: productId,
                user_id: 123,
                quantity: 1
            });
            toast.success("Product added to cart!");
            if (typeof setCartUpdated === "function") {
              setCartUpdated(prev => !prev);
            }
        }catch(error){
            toast.error("BAZAR MATHI LAI LEVU");
        }
    }

    const [data, setData] = useState([]);

    // Get search query from URL parameters
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/product/showproduct");
                setData(response.data);
            } catch (error) {
                toast.error("Error fetching products. Please make sure the server is running.");
            }
        };
        fetchData();
    }, []);

    const searchQuery = searchParams.get("search") || "";

    const displayData = data.filter((item) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            (item.productname && item.productname.toLowerCase().includes(query)) ||
            (item.brandname && item.brandname.toLowerCase().includes(query)) ||
            (item.categoryname && item.categoryname.toLowerCase().includes(query))
        );
    });

    return (
        <div className="body-container">
            {/* Header Section */}
            <div className="body-header">
                <h1 className="body-title">BUY NOW</h1>
                <p className="body-subtitle">Discover premium items at unbeatable prices</p>
            </div>

            {/* Main Content Area */}
            <div className="product-grid animate-fade-in">
                {displayData.map((item) => (
                        <div key={item._id} className="product-card">
                            {item.categoryname && (
                                <div className="product-badge">
                                    {item.categoryname}
                                </div>
                            )}

                            <div className="product-image">
                                <img 
                                    src={item.productphoto} 
                                    alt={item.productname} 
                                />
                            </div>

                            <div className="product-info">
                                <div className="brand-label">{item.brandname}</div>
                                <h2 className="product-name" title={item.productname}>
                                    {item.productname}
                                </h2>
                                
                                <div className="specs-grid">
                                    <div className="spec-item">
                                        <FaTag className="spec-icon" />
                                        <div className="spec-details">
                                            <span className="spec-label">Model</span>
                                            <span className="spec-value" title={item.modelnumber}>{item.modelnumber}</span>
                                        </div>
                                    </div>
                                    <div className="spec-item">
                                        <FaCalendarAlt className="spec-icon" />
                                        <div className="spec-details">
                                            <span className="spec-label">Year</span>
                                            <span className="spec-value">{item.modelyear}</span>
                                        </div>
                                    </div>
                                    <div className="spec-item">
                                        <FaPalette className="spec-icon" />
                                        <div className="spec-details">
                                            <span className="spec-label">Color</span>
                                            <span className="spec-value">{item.color}</span>
                                        </div>
                                    </div>
                                    <div className="spec-item">
                                        <FaWeightHanging className="spec-icon" />
                                        <div className="spec-details">
                                            <span className="spec-label">Weight</span>
                                            <span className="spec-value">{item.weight}</span>
                                        </div>
                                    </div>
                                    <div className="spec-item full-width">
                                        <FaBoxOpen className="spec-icon" />
                                        <div className="spec-details">
                                            <span className="spec-label">Included</span>
                                            <span className="spec-value" title={item.includedcomponent}>{item.includedcomponent}</span>
                                        </div>
                                    </div>
                                    <div className="spec-item full-width">
                                        <FaShieldAlt className="spec-icon" />
                                        <div className="spec-details">
                                            <span className="spec-label">Warranty</span>
                                            <span className="spec-value" title={item.warranty}>{item.warranty}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="product-actions">
                                   <button onClick={() => {HandleAddToCart(item._id)}} className="add-to-cart-btn">
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}