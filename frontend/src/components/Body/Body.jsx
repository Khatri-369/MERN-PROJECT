import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot.jsx";
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

export default function Body({ cartUpdated, setCartUpdated }) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [activeImgIdx, setActiveImgIdx] = useState(0);
    const [zoomStyle, setZoomStyle] = useState({ display: "none" });

    const getResolvedPhotoUrl = (photo) => {
        if (!photo) return "";
        if (photo.startsWith("http")) {
            return photo.replace("localhost:8001", "localhost:8000");
        }
        return `http://localhost:8000/uploads/${photo}`;
    };

    const handleMouseMove = (e, imageUrl) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyle({
            display: "block",
            backgroundImage: `url(${imageUrl})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: "220%"
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: "none" });
    };

    const fetchCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8000/cart/showonecart");
            setCartItems(response.data);
        } catch (error) {
            console.error("Error loading cart items:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [cartUpdated]);

    const getCartItem = (productId) => {
        return cartItems.find(item => {
            const itemProdId = item.product_id?._id || item.product_id;
            return itemProdId === productId;
        });
    };

    //ADD TO CART FUNCTIONALITY
    //USERID WE NEED TO FETCH FROM COOKIE OR LOCAL STORAGES                                       ///IMPORTANT///
    const HandleAddToCart = async (productId)=>{
        try{
            const response = await axios.post("http://localhost:8000/cart/createcart", {
                product_id: productId,
                quantity: "1"
            });
            toast.success("Product added to cart!");
            setCartUpdated(prev => !prev);
        }catch(error){
            toast.error("BAZAR MATHI LAI LEVU");
        }
    }

    const handleIncrement = async (cartItem) => {
        try {
            const newQty = Number(cartItem.quantity || 0) + 1;
            await axios.put(`http://localhost:8000/cart/updatecart/${cartItem._id}`, {
                quantity: String(newQty)
            });
            setCartUpdated(prev => !prev);
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };

    const handleDecrement = async (cartItem) => {
        try {
            const newQty = Number(cartItem.quantity || 0) - 1;
            if (newQty <= 0) {
                await axios.delete(`http://localhost:8000/cart/deletecart/${cartItem._id}`);
                toast.success("Product removed from cart!");
            } else {
                await axios.put(`http://localhost:8000/cart/updatecart/${cartItem._id}`, {
                    quantity: String(newQty)
                });
            }
            setCartUpdated(prev => !prev);
        } catch (error) {
            toast.error("Failed to update quantity");
        }
    };
    

    const [data, setData] = useState([]);

    // Get search query from URL parameters
    const [searchParams, setSearchParams] = useSearchParams();

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

                             <div className="product-image" onClick={() => { setSelectedProduct(item); setActiveImgIdx(0); }} style={{ cursor: "pointer" }}>
                                 <img 
                                     src={
                                         item.productphoto && item.productphoto.length > 0
                                             ? getResolvedPhotoUrl(Array.isArray(item.productphoto) ? item.productphoto[0] : item.productphoto)
                                             : ""
                                     } 
                                     alt={item.productname} 
                                 />
                             </div>

                            <div className="product-info">
                                <div className="brand-label">{item.brandname}</div>
                                 <h2 className="product-name" title={item.productname} onClick={() => { setSelectedProduct(item); setActiveImgIdx(0); }} style={{ cursor: "pointer" }}>
                                     {item.productname}
                                 </h2>
                                 
                                 <div className="product-price-container">
                                     <span className="price-symbol">₹</span>
                                     <span className="price-amount">{item.price}</span>
                                 </div>
                                 
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
                                    {getCartItem(item._id) ? (
                                        <div className="quantity-control">
                                            <button onClick={() => handleDecrement(getCartItem(item._id))} className="quantity-btn">-</button>
                                            <span className="quantity-value">{getCartItem(item._id).quantity}</span>
                                            <button onClick={() => handleIncrement(getCartItem(item._id))} className="quantity-btn">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => {HandleAddToCart(item._id)}} className="add-to-cart-btn">
                                            <FaShoppingCart /> Add to Cart
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
            </div>

            {/* Detailed Product Quick View Modal with Zoom & Gallery */}
            {selectedProduct && (
                <div className="body-modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="body-modal-card animate-scale-up" onClick={(e) => e.stopPropagation()}>
                        <button className="body-modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
                        
                        <div className="body-modal-content">
                            {/* Left Column: Image Gallery */}
                            <div className="modal-gallery-column">
                                <div 
                                    className="modal-main-image-container"
                                    onMouseMove={(e) => {
                                        const photos = Array.isArray(selectedProduct.productphoto) ? selectedProduct.productphoto : [selectedProduct.productphoto];
                                        const currentPhoto = photos[activeImgIdx];
                                        handleMouseMove(e, getResolvedPhotoUrl(currentPhoto));
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <img 
                                        src={
                                            selectedProduct.productphoto && selectedProduct.productphoto.length > 0
                                                ? getResolvedPhotoUrl(Array.isArray(selectedProduct.productphoto) ? selectedProduct.productphoto[activeImgIdx] : selectedProduct.productphoto)
                                                : ""
                                        } 
                                        alt={selectedProduct.productname} 
                                        className="modal-main-image"
                                    />
                                    {/* Hover Zoom Overlay Panel */}
                                    <div className="zoom-lens-viewer" style={zoomStyle}></div>
                                </div>

                                {/* Thumbnail Gallery strip */}
                                {Array.isArray(selectedProduct.productphoto) && selectedProduct.productphoto.length > 1 && (
                                    <div className="modal-thumb-strip">
                                        {selectedProduct.productphoto.map((photo, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`modal-thumb-item ${idx === activeImgIdx ? 'active' : ''}`}
                                                onClick={() => { setActiveImgIdx(idx); setZoomStyle({ display: "none" }); }}
                                            >
                                                <img src={getResolvedPhotoUrl(photo)} alt={`Thumbnail ${idx}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Detailed Product Specs & Checkout */}
                            <div className="modal-info-column">
                                <span className="modal-brand-label">{selectedProduct.brandname}</span>
                                <h1 className="modal-product-name">{selectedProduct.productname}</h1>
                                
                                <div className="modal-price-container">
                                    <span className="modal-price-symbol">₹</span>
                                    <span className="modal-price-amount">{selectedProduct.price.toLocaleString()}</span>
                                </div>

                                <div className="modal-specs-section">
                                    <h3>Product Specifications</h3>
                                    <div className="modal-specs-list">
                                        <div className="modal-spec-row">
                                            <strong>Model Number:</strong> <span>{selectedProduct.modelnumber}</span>
                                        </div>
                                        <div className="modal-spec-row">
                                            <strong>Model Year:</strong> <span>{selectedProduct.modelyear}</span>
                                        </div>
                                        <div className="modal-spec-row">
                                            <strong>Color Option:</strong> <span>{selectedProduct.color}</span>
                                        </div>
                                        <div className="modal-spec-row">
                                            <strong>Item Weight:</strong> <span>{selectedProduct.weight}</span>
                                        </div>
                                        <div className="modal-spec-row">
                                            <strong>Included Accessories:</strong> <span>{selectedProduct.includedcomponent}</span>
                                        </div>
                                        <div className="modal-spec-row">
                                            <strong>Warranty Period:</strong> <span>{selectedProduct.warranty}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-actions-section">
                                    {getCartItem(selectedProduct._id) ? (
                                        <div className="modal-quantity-control">
                                            <button onClick={() => handleDecrement(getCartItem(selectedProduct._id))} className="quantity-btn">-</button>
                                            <span className="quantity-value">{getCartItem(selectedProduct._id).quantity}</span>
                                            <button onClick={() => handleIncrement(getCartItem(selectedProduct._id))} className="quantity-btn">+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => HandleAddToCart(selectedProduct._id)} className="modal-add-to-cart-btn">
                                            <FaShoppingCart /> Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chatbot Assistant */}
            <Chatbot 
                products={data}
                onAddToCart={HandleAddToCart}
                cartItems={cartItems}
                setCartUpdated={setCartUpdated}
                setSearchParams={setSearchParams}
            />
        </div>
    );
}   