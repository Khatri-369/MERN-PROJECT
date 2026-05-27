import Vendor from "../../model/VendorModel.js";

export const ShowVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        message: "VENDOR NOT FOUND"
      });
    }

    res.status(200).json(vendor);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};