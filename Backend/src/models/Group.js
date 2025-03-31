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
    creator:{
        type: DataTypes.UUID,
        allowNull: false,
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

Group.sync({force:false});
module.exports = Group;