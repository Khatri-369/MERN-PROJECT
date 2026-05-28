import Product from "../../model/ProductModel.js";

export const CreateProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};