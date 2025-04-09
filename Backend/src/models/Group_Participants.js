const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const GroupParticipant = sequelize.define('group_participant', {
    group_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'groups',
            key: 'id'
        }
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    date_joined:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
});
module.exports = GroupParticipant;