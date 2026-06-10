import jwt from "jsonwebtoken";

export const shopauth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "PLEASE LOGIN FIRST"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.shopId = decoded.shopId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "INVALID TOKEN"
        });
    }
};
