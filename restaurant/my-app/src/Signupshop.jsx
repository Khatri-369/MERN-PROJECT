import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signupshop = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        owner: "",
        email: "",
        password: "",
        mobile: "",
        address: "",
        city: "",
        pincode: "",
        status: "active" // Defaulting to active for convenience
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
            const response = await axios.post("http://localhost:8001/shop/createshop", formData);
            setSuccess(response.data.message || "SHOP REGISTERED SUCCESSFULLY!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Register Your Store</h2>
                <p style={styles.subtitle}>Get started by creating your vendor shop account</p>

                {error && <div style={styles.errorBanner}>{error}</div>}
                {success && <div style={styles.successBanner}>{success}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.grid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Shop Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Gourmet Pizza Bistro"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Owner Full Name</label>
                            <input
                                type="text"
                                name="owner"
                                value={formData.owner}
                                onChange={handleChange}
                                required
                                placeholder="e.g. John Doe"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="e.g. contact@pizza.com"
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

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                placeholder="e.g. +91 9876543210"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 400001"
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Street Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 123 Main Street, Sector 4"
                            rows="2"
                            style={{ ...styles.input, ...styles.textarea }}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Mumbai"
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? "Registering..." : "Create Shop"}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Already have a shop? <Link to="/login" style={styles.link}>Sign In</Link>
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
        padding: "40px 20px",
        minHeight: "100vh"
    },
    card: {
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
        padding: "40px",
        width: "100%",
        maxWidth: "650px",
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
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
        marginBottom: "20px"
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "15px"
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
    textarea: {
        resize: "none"
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
        marginTop: "15px"
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

export default Signupshop;
