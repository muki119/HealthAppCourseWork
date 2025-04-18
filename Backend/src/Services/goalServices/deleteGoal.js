const database = require('../../config/Database');
const {Goal} = require('../../models');

const deleteGoalService = async (userId,goalId) => {
    try {
        const destroyGoalTransaction = await database.transaction(async (t)=>{
            await Goal.destroy({
                where: {
                    userId: userId,
                    id: goalId
                },
                transaction: t
            })
            return true;
        })
        return destroyGoalTransaction;
    } catch (error) {
        throw error;
    }
}

module.exports = deleteGoalService;