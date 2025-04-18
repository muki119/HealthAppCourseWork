const database = require('../../config/Database');
const {Goal} = require('../../models');

const createGoalService = async (userId,goalData) => {
    try {
        const {start_date,end_date,goal_name,goal_type,goal_value} = goalData
        const createGoalTransaction = await database.transaction(async (t) => {
            const newGoal = await Goal.create({
                user_id :userId,
                start_date: start_date,
                end_date: end_date,
                goal_name: goal_name,
                goal_type: goal_type,
                goal_value: goal_value,
            }, {
                transaction: t
            });
            return newGoal;
        });
        return createGoalTransaction;
    } catch (error) {
        throw error;
    }
}

module.exports = createGoalService;