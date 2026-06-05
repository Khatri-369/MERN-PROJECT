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
            console.error("Failed to delete photo file:", err);
        }
    });
};

export const DeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "PRODUCT NOT FOUND"
            });
        }

        // Delete old photos from the disk
        deletePhotosFromDisk(product.productphoto);

        res.status(200).json({
            message: "PRODUCT DELETED SUCCESSFULLY"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};