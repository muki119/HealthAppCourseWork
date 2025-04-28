const {GroupMessage} = require('../../models')
const { Op } = require('sequelize');
const getGroupMessagesService = async (groupId,datebefore = new Date())=>{
    try {
        const groupMessages = await GroupMessage.findAll(
            {
                where:{
                    group_id:groupId,
                    date_sent:{
                        [Op.lte]:datebefore
                    }
                },
                limit: 85,
                order:[['date_sent','DESC']],
                attributes:['id','content','date_sent','goal_id']
            })
        return groupMessages
    } catch (error) {
        throw error
    }

};

module.exports =  getGroupMessagesService;