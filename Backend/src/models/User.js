const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    forname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    last_online:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    
})
User.sync({force:false});

module.exports = User;