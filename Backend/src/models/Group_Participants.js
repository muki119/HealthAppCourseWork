const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const GroupParticipant = sequelize.define('group_participant', {
    group_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    date_joined:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});
module.exports = GroupParticipant;