import Shop from "../model/shopmodel.js";
import bcrypt from "bcrypt";
import bcrypt from "bcrypt";

const CreateShop = async (req, res) => {
    try {
        const { name, address, city, pincode, mobile, email, owner, status, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "PASSWORD IS REQUIRED" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const details = new Shop({
            name,
            address,
            city,
            pincode,
            mobile,
            email,
            owner,
            status: status || "pending",
            password: hashedPassword
        });

        const response = await details.save();
        return res.status(201).json({
            message: "RESTAURANT CREATED SUCCESSFULLY",
            data: response
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export default CreateShop;