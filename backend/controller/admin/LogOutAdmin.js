export const LogoutAdmin = (req, res) => {

    res.clearCookie("token"); //IN LOGOUT WE CLEAR THE TOKEN COOKIE

    res.status(200).json({
        message: "Logout Successful"
    });
};