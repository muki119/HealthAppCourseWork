const {Goal} = require('../../models');
const {Op} = require('sequelize');
const getUserGoalsService = async (userId,dateBefore = new Date()) => {
    try {
        const userGoals = await Goal.findAll({
            where:{
                user_id: userId,
                date_created:{
                    [Op.lt]: dateBefore
                }
            },
            order: [['date_created', 'DESC']]
        });
        return userGoals;
    } catch (error) {
        throw error;
    }
}

module.exports = getUserGoalsService;