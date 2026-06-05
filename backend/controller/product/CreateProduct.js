import Product from "../../model/ProductModel.js";

export const CreateProduct = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "At least one product photo is required" });
        }

        const photoUrls = req.files.map(
            file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );

        const product = new Product({
            ...req.body,
            productphoto: photoUrls
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};