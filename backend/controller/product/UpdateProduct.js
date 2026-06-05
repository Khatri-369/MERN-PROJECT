import Product from "../../model/ProductModel.js";
import fs from "fs";
import path from "path";

// Helper function to delete product photos from the disk
const deletePhotosFromDisk = (photoUrls) => {
    if (!photoUrls || !Array.isArray(photoUrls)) return;
    photoUrls.forEach((photoUrl) => {
        try {
            const filename = photoUrl.split("/").pop();
            const filepath = path.join("uploads", filename);

            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        } catch (err) {
            console.error("Failed to delete old photo file:", err);
        }
    });
};

export const UpdateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        const updateData = { ...req.body };

        if (req.files && req.files.length > 0) {
            // Delete old photos from the disk
            deletePhotosFromDisk(product.productphoto);

            // Set new photo URLs
            const photoUrls = req.files.map(
                file => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
            );
            updateData.productphoto = photoUrls;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};