const { where } = require('sequelize');
const db = require('../db'); 
const { GroupParticipant } = require('../models');

const checkUserParticipation = (userId,groupId) => {
    // query the database to check if the user is already a participant in the group
    //check the group_participants table
    const isParticipant = GroupParticipant.count({
        where:{
            group_id: groupId,
            user_id: userId
        }
    });
    if(isParticipant){
        return true;
    }
    return false;
};