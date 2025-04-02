const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const Metric = sequelize.define('metric', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    metric_type:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    metric_value:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
    }
});
module.exports = Metric;