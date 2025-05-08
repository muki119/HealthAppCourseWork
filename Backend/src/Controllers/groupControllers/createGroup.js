const {groupServices} = require('../../Services')
const {createGroupService} = groupServices
const { validationResult } = require('express-validator');

const createGroupController = async (req, res,next) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
    const userId = req.session.user.id;
    const {name} = req.body;

    //groupname needs to be checked.
    try {
        const newGroup = await createGroupService(userId,name);
        res.json(newGroup);

    }catch(error){ // there shouldnt be a problem creating the function thats a user error.
        console.log('Error in createGroupController',error)
        next(error)
    }
}
module.exports = createGroupController;