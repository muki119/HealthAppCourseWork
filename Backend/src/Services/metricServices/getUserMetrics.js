const {Metric}  = require('../../models')
const { Op } = require('sequelize');

const getThisWeekMonday = (date)=>{
    const newDate = new Date(date);
    var dateDayOfWeek = newDate.getDay();
    const daysFromMonday = dateDayOfWeek ? (dateDayOfWeek - 1) : 6;
    newDate.setDate(newDate.getDate() - daysFromMonday);
    newDate.setHours(0,0,0)
    return newDate;
}
const getPreviousWeekMonday = (mondayDate)=>{
    const newDate = new Date(mondayDate)
    var mondayDateDay = newDate.getDate()
    const mondayBefore = newDate.setDate(mondayDateDay - 7) 
    return (new Date(mondayBefore))
}

const getUserMetricsService = async (userId,dateFrom = null) => {
    try {
        // incoming dateFrom should be a monday
        // find the monday of this week .
        const dataBeforeDate = dateFrom // find all data before this date 
            ?getThisWeekMonday(new Date (dateFrom)) //Current Monday
            :new Date() 
        const dataAfterDate = dateFrom  // find all data after this date 
            ?getPreviousWeekMonday(dataBeforeDate) // Monday of previous week
            : getThisWeekMonday(dataBeforeDate)  // Monday of current week.
        // should be dataAfterDate <= userMetricsData <= dataBeforeDate
        // data should be week by week from that day to the monday of that week. 
        const userMetrics = await Metric.findAll({
            where:{
                user_id:userId,
                date_created:{
                    [Op.gte]:dataAfterDate, // lower bound - oldest data
                    [Op.lte]:dataBeforeDate // upper bound - newest data
                }   
            },
        });
        return userMetrics
    } catch (error) {
        throw error
    }
}



module.exports = getUserMetricsService;