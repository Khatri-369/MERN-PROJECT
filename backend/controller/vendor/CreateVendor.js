import Vendor from "../../model/VendorModel.js";

export const createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();

    res.status(201).json({
      message: "VENDOR CREATED SUCCESSFULLY"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};