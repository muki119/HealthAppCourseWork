const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');
const GroupParticipant = require('./Group_Participants.js');
// const User = require('./User.js');

const Group = sequelize.define('group', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    creator_id:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});
module.exports = Group;