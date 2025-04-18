const database = require('../../config/Database');
const {Goal} = require('../../models');

const updateGoalService = async (userId,goalId,goalData) => {
    try {
        const updateGoalTransaction = await database.transaction(async (t) => {
            const updatedGoal = await Goal.update(goalData,{
                where: {
                    user_id: userId,
                    id: goalId
                },
                transaction: t
            });
            const affectedRows = updatedGoal[0];
            if (!affectedRows) {
                throw new Error('Goal not found');
            }
            return updatedGoal;
        });
        return updateGoalTransaction;
    } catch (error) {
        throw error;
    }
}

module.exports = updateGoalService;