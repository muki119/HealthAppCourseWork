const sequelize = require('../config/Database.js');
const { DataTypes } = require('sequelize');

const Metric = sequelize.define('metric', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    metric_type:{
        type:DataTypes.STRING, // is string instead of enums to allow ability to add different types . 
        allowNull: false,
    },
    metric_value:{
        type:DataTypes.FLOAT,
        allowNull: false,
    },
    time_of_day:{
        type:DataTypes.ENUM,
        values:['BREAKFAST','SECOND_BREAKFAST','BRUNCH','LUNCH','TEA','DINNER','SNACK'],
        allowNull: true,
    },
    date_created:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
},{
    indexes: [
        {
            fields: ['user_id']
        },
        {
            fields:[{
                name:'date_created',
                order:'DESC'
            }],
            
        }
    ],
    createdAt: false,
});
module.exports = Metric;