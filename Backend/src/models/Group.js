const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

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
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
});
module.exports = Group;