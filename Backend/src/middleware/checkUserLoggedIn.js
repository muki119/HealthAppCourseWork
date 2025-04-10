

const checkUserLoggedIn = (req, res, next) => {
    // Check if user is logged in
    if (req.session.user) {
        // User is logged in, proceed to the next middleware or route handler
        next();
    } else {
        // User is not logged in, send an unauthorized response
        res.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }
}
module.exports = checkUserLoggedIn;