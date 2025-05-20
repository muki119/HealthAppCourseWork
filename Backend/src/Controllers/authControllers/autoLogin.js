const automaticLoginController = async (req, res,next) => {
    try {
        if (req.session.user) {
            // User is already logged in, send user data
            return res.status(200).json({message:"User already logged in"});
        }else {
            return res.status(401).json({message:"User not logged in"});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = automaticLoginController;