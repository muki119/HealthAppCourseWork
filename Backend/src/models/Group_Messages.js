const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const GroupMessage = sequelize.define('group_messages', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    group_id:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    goal_id:{
        type: DataTypes.UUID,
        allowNull: true,
    },
    date_sent:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});
module.exports = GroupMessage;