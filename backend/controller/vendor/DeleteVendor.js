import Vendor from "../../model/VendorModel.js";

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "VENDOR NOT FOUND"
      });
    }

    res.status(200).json({
      message: "VENDOR DELETED SUCCESSFULLY"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};