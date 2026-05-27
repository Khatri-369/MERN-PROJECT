import Vendor from "../../model/VendorModel.js";

export const showVendor = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    res.status(200).json(vendors);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};