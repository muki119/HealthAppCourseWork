const User = require('./User.js');
const Group = require('./Group.js');
const GroupParticipant = require('./Group_Participants.js');
const GroupMessage = require('./Group_Messages.js');
const Metric = require('./Metric.js');
const sequelize = require('../config/Database.js');

// Associations

// User and GroupParticipant
User.hasMany(GroupParticipant, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
GroupParticipant.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
// User and Group.creator_id
User.hasMany(Group, {
    foreignKey: 'creator_id',
    sourceKey: 'id'
});
// Group and GroupParticipant
Group.hasMany(GroupParticipant, {
    foreignKey: 'group_id',
    sourceKey: 'id'
});
GroupParticipant.belongsTo(Group, {
    foreignKey: 'group_id',
    targetKey: 'id'
});
//User and GroupMessage
User.hasMany(GroupMessage, {
    foreignKey: 'user_id',
    sourceKey: 'id'
});
GroupMessage.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id'
});
// Group and GroupMessage
Group.hasMany(GroupMessage, {
    foreignKey: 'group_id',
    sourceKey: 'id'
});
GroupMessage.belongsTo(Group, {
    foreignKey: 'group_id',
    targetKey: 'id'
});


sequelize.sync({ force: false,alter:true}).then(() => {
    console.log('All models were synchronized successfully.');
}
).catch((error) => {
    console.error('Error synchronizing models:', error);
});
module.exports = {
    User,
    Group,
    GroupParticipant,
    GroupMessage,
    Metric
}