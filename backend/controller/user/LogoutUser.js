export const LogoutUser = (req, res) => {

    res.clearCookie("token"); //IN LOGOUT WE CLEAR THE TOKEN IN COOKIE

    res.status(200).json({
        message: "Logout Successful"
    });
};