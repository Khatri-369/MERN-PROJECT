import Vendor from "../../model/VendorModel.js";

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({
        message: "VENDOR NOT FOUND"
      });
    }

    res.status(200).json({
      message: "VENDOR UPDATED SUCCESSFULLY"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};