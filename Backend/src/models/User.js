const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    forename:{
        type: DataTypes.STRING,
        allowNull: false
    },
    surname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    salt:{
        type: DataTypes.STRING,
        allowNull:false
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    last_online:{
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true
    },
    
},{
    indexes: [
        {
            fields: ['email'],
            unique: true
        },
        {
            fields: ['username'],
            unique: true
        }
    ],
    createdAt: false,
})
module.exports = User;