const { User } = require('../../models');

const checkUsernameController = async (req, res, next) => {
    try {
        const { username } = req.params;
        const existingUser = await User.findOne({ where: { username } });
        res.json({ exists: !!existingUser });
    } catch (error) {
        next(error);
    }
};

module.exports = checkUsernameController; 