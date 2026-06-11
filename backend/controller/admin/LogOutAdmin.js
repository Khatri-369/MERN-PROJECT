export const LogoutAdmin = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
        message: "Logout Successful"
    });
};