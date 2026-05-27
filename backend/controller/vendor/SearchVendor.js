import Vendor from "../../model/VendorModel.js";

export const searchVendor = async (req, res) => {
  try {
    const text = req.query.search;

    const vendor = await Vendor.find({
      vendorname: new RegExp(text, "i")
    });

    if (vendor.length === 0) {
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