import Product from "../model/productmodel.js";

export const createShopProduct = async (req, res) => {
    try {
        const {
            productname,
            modelnumber,
            modelyear,
            price,
            brandname,
            categoryname,
            color,
            weight,
            includedcomponent,
            warranty,
            productphoto
        } = req.body;

        if (!productname || !price || !categoryname || !brandname || !modelnumber) {
            return res.status(400).json({
                message: "PRODUCT NAME, PRICE, CATEGORY, BRAND, AND MODEL NUMBER ARE REQUIRED"
            });
        }

        // Handle file uploads via Multer, fall back to body string if provided
        let photos = [];
        if (req.files && req.files.length > 0) {
            const host = req.get("host"); // e.g. "localhost:8001" or "localhost:8000"
            photos = req.files.map(file => `${req.protocol}://${host}/uploads/${file.filename}`);
        } else if (productphoto) {
            photos = Array.isArray(productphoto) ? productphoto : [productphoto];
        }

        const newProduct = new Product({
            productname,
            modelnumber,
            modelyear: Number(modelyear) || new Date().getFullYear(),
            price: Number(price),
            brandname,
            categoryname,
            color: color || "N/A",
            weight: weight || "N/A",
            includedcomponent: includedcomponent || "N/A",
            warranty: warranty || "N/A",
            productphoto: photos,
            shopId: req.shopId // Linked to active seller shop
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: "PRODUCT ADDED SUCCESSFULLY TO YOUR CATALOG",
            product: savedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getShopProducts = async (req, res) => {
    try {
        const products = await Product.find({ shopId: req.shopId });
        return res.status(200).json({
            products
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteShopProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOneAndDelete({ _id: id, shopId: req.shopId });

        if (!product) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND OR NOT AUTHORIZED TO DELETE"
            });
        }

        return res.status(200).json({
            message: "PRODUCT DELETED SUCCESSFULLY FROM CATALOG"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
