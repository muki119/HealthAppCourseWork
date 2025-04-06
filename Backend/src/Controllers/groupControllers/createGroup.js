const {createGroupService} = require('../../Services')
const createGroupController = async (req, res) => {
    const userId = req.session.user.id;
    const {groupName} = req.body;

    //groupname needs to be checked.
    try {
        const newGroup = await createGroupService(userId,groupName);
        res.json(newGroup);

    }catch(error){ // there shouldnt be a problem creating the function thats a user error.
        console.log('Error in createGroupController',error)
        next(error)
    }
}
module.exports = createGroupController;