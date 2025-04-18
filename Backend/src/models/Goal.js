const sequelize = require('../config/Database.js');
const { DataTypes, UUID } = require('sequelize');

const Goal = sequelize.define('Goal', {
    id:{
        type: DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull:false,
        references:{
            model:'users',
            key:'id'
        }
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    goal_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    goal_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goal_value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    achieved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    date_created:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }


},{createdAt: false});


module.exports = Goal;