import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginShop = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Set withCredentials globally or per request so cookies are sent/saved
            const response = await axios.post("http://localhost:8001/shop/login", formData, {
                withCredentials: true
            });
            
            setSuccess("LOGIN SUCCESSFUL! REDIRECTING...");
            
            // Save shop basic details to localStorage
            localStorage.setItem("shopInfo", JSON.stringify(response.data.shop));
            
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Shop Partner Login</h2>
                <p style={styles.subtitle}>Sign in to manage your restaurant, menu items, and orders</p>

                {error && <div style={styles.errorBanner}>{error}</div>}
                {success && <div style={styles.successBanner}>{success}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="yourshop@email.com"
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Authenticating..." : "Login to Panel"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    New partner? <Link to="/signup" style={styles.link}>Register Shop</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        minHeight: "100vh"
    },
    card: {
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
        padding: "40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "var(--card-shadow)",
        backdropFilter: "blur(12px)",
        textAlign: "center"
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "8px",
        color: "var(--text-primary)"
    },
    subtitle: {
        color: "var(--text-secondary)",
        fontSize: "14px",
        marginBottom: "30px"
    },
    form: {
        textAlign: "left"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px"
    },
    label: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "var(--text-secondary)",
        marginBottom: "8px"
    },
    input: {
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid var(--border-color)",
        borderRadius: "8px",
        padding: "12px 16px",
        color: "var(--text-primary)",
        fontSize: "14px",
        outline: "none",
        transition: "border-color var(--transition-speed), background var(--transition-speed)"
    },
    button: {
        width: "100%",
        background: "var(--color-accent)",
        border: "none",
        borderRadius: "8px",
        padding: "14px",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background var(--transition-speed), transform 0.1s ease",
        marginTop: "10px"
    },
    errorBanner: {
        background: "rgba(239, 68, 68, 0.15)",
        border: "1px solid var(--color-error)",
        color: "#fca5a5",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px",
        marginBottom: "20px",
        textAlign: "left"
    },
    successBanner: {
        background: "rgba(16, 185, 129, 0.15)",
        border: "1px solid var(--color-success)",
        color: "#a7f3d0",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px",
        marginBottom: "20px",
        textAlign: "left"
    },
    footerText: {
        fontSize: "14px",
        color: "var(--text-secondary)",
        marginTop: "25px"
    },
    link: {
        color: "var(--color-accent)",
        textDecoration: "none",
        fontWeight: "600"
    }
};

export default LoginShop;
