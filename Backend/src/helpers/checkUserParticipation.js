const { GroupParticipant } = require('../models');
const checkUserParticipationHelper = async (userId,groupId) => {
    // query the database to check if the user is already a participant in the group
    //check the group_participants table
    const isParticipant = await GroupParticipant.findOne({
        where:{
            group_id: groupId,
            user_id: userId
        }
    });
    return Boolean(isParticipant)
};

module.exports = checkUserParticipationHelper