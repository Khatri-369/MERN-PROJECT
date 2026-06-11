import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane, FaRobot, FaTimes, FaCommentDots } from "react-icons/fa";
import axios from "axios";
import "./Chatbot.css";

export default function Chatbot({ products, onAddToCart, cartItems, setCartUpdated, setSearchParams }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Hello! I am ShopBot, your personal shopping assistant. How can I help you today? You can ask me to search products, add items to your cart, or clean your cart!"
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        const newMessage = {
            id: Date.now(),
            sender: "user",
            text: userText
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate thinking delay
        setTimeout(() => {
            processCommand(userText);
        }, 1000);
    };

    const processCommand = async (text) => {
        const lowerText = text.toLowerCase();
        setIsTyping(false);

        // Help / Greeting intent
        if (lowerText.includes("help") || lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
            addBotMessage("You can try commands like:\n• 'search iphone'\n• 'add keyboard to cart'\n• 'clear my cart'\n• 'go to checkout'\n• 'what products do you have?'");
            return;
        }

        // Checkout intent
        if (lowerText.includes("checkout") || lowerText.includes("buy") || lowerText.includes("go to cart") || lowerText.includes("show cart")) {
            addBotMessage("Redirecting you to the cart page for checkout...");
            setTimeout(() => {
                navigate("/showcart");
            }, 1000);
            return;
        }

        // Clear cart intent
        if (lowerText.includes("clear cart") || lowerText.includes("empty cart") || lowerText.includes("clear my cart") || lowerText.includes("empty my cart")) {
            if (!cartItems || cartItems.length === 0) {
                addBotMessage("Your cart is already empty!");
                return;
            }
            addBotMessage("Clearing your cart, please wait...");
            try {
                for (const item of cartItems) {
                    await axios.delete(`http://localhost:8000/cart/deletecart/${item._id}`);
                }
                setCartUpdated(prev => !prev);
                addBotMessage("Successfully cleared all items from your cart!");
            } catch (err) {
                addBotMessage("Error clearing your cart. Please try again.");
            }
            return;
        }

        // Add to cart intent (handles multiple items)
        if (
            (lowerText.includes("add") || lowerText.includes("put") || lowerText.includes("get")) &&
            !lowerText.includes("search") && !lowerText.includes("show") && !lowerText.includes("find")
        ) {
            const addRegex = /(?:add|put|get)\s+(.*)/i;
            const match = lowerText.match(addRegex);
            if (match && match[1]) {
                let cleanText = match[1].trim();
                // Strip trailing common phrases
                cleanText = cleanText.replace(/(?:\s+to\s+cart|\s+for\s+me|\s+in\s+my\s+cart)$/i, "").trim();

                // Split items by commas and "and"
                const rawItems = cleanText.split(/,\s*|\s+and\s+/i);
                
                // Clean individual items (e.g. remove leading "a", "an", "some", "and")
                const itemsToFind = rawItems
                    .map(item => item.trim().replace(/^(?:a\s+|an\s+|some\s+|and\s+)/i, "").trim())
                    .filter(Boolean);

                if (itemsToFind.length > 0) {
                    addBotMessage(`Processing request to add ${itemsToFind.length} item(s)...`);
                    
                    let addedCount = 0;
                    let failedCount = 0;
                    let notFoundItems = [];
                    let foundItems = [];

                    for (const itemKeyword of itemsToFind) {
                        const matchedProduct = findBestMatch(itemKeyword);
                        if (matchedProduct) {
                            foundItems.push({ keyword: itemKeyword, product: matchedProduct });
                        } else {
                            notFoundItems.push(itemKeyword);
                        }
                    }

                    if (foundItems.length > 0) {
                        for (const { product } of foundItems) {
                            try {
                                await onAddToCart(product._id);
                                addBotMessage(`Added "${product.productname}" to your cart successfully!`);
                                addedCount++;
                            } catch (err) {
                                addBotMessage(`Failed to add "${product.productname}" to cart.`);
                                failedCount++;
                            }
                        }
                    }

                    // Send summary bot message
                    if (addedCount > 0 && notFoundItems.length === 0 && failedCount === 0) {
                        addBotMessage(`Done! All requested items have been added to your cart.`);
                    } else {
                        let summaryMsg = `Summary:\n`;
                        if (addedCount > 0) summaryMsg += `• Added ${addedCount} item(s) successfully.\n`;
                        if (failedCount > 0) summaryMsg += `• Failed to add ${failedCount} item(s).\n`;
                        if (notFoundItems.length > 0) {
                            summaryMsg += `• Couldn't find matching products for: ${notFoundItems.map(item => `"${item}"`).join(", ")}.\n`;
                            summaryMsg += `Try using more specific names from the catalog!`;
                        }
                        addBotMessage(summaryMsg);
                    }
                    return;
                }
            }
        }

        // Search intent
        const searchRegex = /(?:search|find|show|look\s+for)\s+(?:me\s+)?(.*?)(?:\s*|$)/i;
        const searchMatch = lowerText.match(searchRegex);

        if (searchMatch && searchMatch[1]) {
            const searchKeyword = searchMatch[1].trim();
            setSearchParams({ search: searchKeyword });
            addBotMessage(`Filtering storefront listings for "${searchKeyword}"!`);
            return;
        }

        // List products query
        if (lowerText.includes("products") || lowerText.includes("items") || lowerText.includes("catalog") || lowerText.includes("sell")) {
            const names = products.slice(0, 5).map(p => `• ${p.productname}`).join("\n");
            addBotMessage(`Here are some of our popular products:\n${names}\n\nType 'search [product]' to find more!`);
            return;
        }

        // Fallback response
        addBotMessage("I'm not sure I understood that command. Try asking 'search keyboard' or 'add sunglasses to cart'!");
    };

    const findBestMatch = (keyword) => {
        if (!products || products.length === 0) return null;

        // 1. Check exact match
        const exact = products.find(p => p.productname.toLowerCase() === keyword);
        if (exact) return exact;

        // 2. Check substring match
        const substring = products.find(p => p.productname.toLowerCase().includes(keyword) || p.brandname.toLowerCase().includes(keyword));
        if (substring) return substring;

        // 3. Check split word match (e.g. "iphone 15" matches "iPhone 15 Pro")
        const words = keyword.split(" ");
        const best = products.find(p => {
            const nameLower = p.productname.toLowerCase();
            return words.every(word => nameLower.includes(word));
        });
        return best || null;
    };

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: "bot",
            text: text
        }]);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
    };

    return (
        <div className="chatbot-widget-container">
            {/* Chatbot Bubble Button */}
            {!isOpen && (
                <button className="chatbot-bubble-btn" onClick={() => setIsOpen(true)}>
                    <FaRobot className="bubble-icon" />
                    <span className="bubble-pulse"></span>
                </button>
            )}

            {/* Chatbot Panel */}
            {isOpen && (
                <div className="chatbot-panel animate-slide-in">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <FaRobot className="chatbot-avatar" />
                            <div>
                                <h3>ShopBot</h3>
                                <span>AI Store Assistant</span>
                            </div>
                        </div>
                        <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages Logs */}
                    <div className="chatbot-messages-container">
                        {messages.map(msg => (
                            <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                                {msg.sender === "bot" && <FaRobot className="msg-avatar" />}
                                <div className={`chat-bubble ${msg.sender}`}>
                                    {msg.text.split("\n").map((line, i) => (
                                        <p key={i} style={{ margin: "4px 0" }}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-bubble-row bot">
                                <FaRobot className="msg-avatar" />
                                <div className="chat-bubble bot typing">
                                    <FaCommentDots className="typing-icon" /> Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick suggestion chips */}
                    <div className="chatbot-suggestions">
                        <button onClick={() => handleSuggestionClick("search keyboard")}>🔍 Search Keyboard</button>
                        <button onClick={() => handleSuggestionClick("add honey, sunglasses, bananas for me")}>⚡ Quick Add Items</button>
                        <button onClick={() => handleSuggestionClick("clear cart")}>🗑️ Clear Cart</button>
                        <button onClick={() => handleSuggestionClick("checkout")}>🛒 Checkout</button>
                    </div>

                    {/* Input Panel */}
                    <form onSubmit={handleSendMessage} className="chatbot-input-form">
                        <input
                            type="text"
                            placeholder="Ask me to search or add items..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="chatbot-send-btn">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}