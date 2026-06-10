import Shop from "../model/shopmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginShop = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "EMAIL AND PASSWORD ARE REQUIRED"
            });
        }

        const shop = await Shop.findOne({ email });
        if (!shop) {
            return res.status(404).json({
                message: "SHOP NOT FOUND"
            });
        }

        const isMatch = await bcrypt.compare(password, shop.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "PASSWORD INCORRECT"
            });
        }

        const token = jwt.sign(
            { shopId: shop._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        });

        return res.status(200).json({
            message: "SHOP SIGN IN SUCCESSFUL",
            shop: {
                _id: shop._id,
                name: shop.name,
                email: shop.email,
                owner: shop.owner
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getShopProfile = async (req, res) => {
    try {
        const shop = await Shop.findById(req.shopId).select("-password");
        if (!shop) {
            return res.status(404).json({ message: "SHOP NOT FOUND" });
        }
        return res.status(200).json({ shop });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logoutShop = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "LOGGED OUT SUCCESSFULLY" });
};
