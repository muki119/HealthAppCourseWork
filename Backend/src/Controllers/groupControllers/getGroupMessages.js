const {groupServices} = require('../../Services')
const {getGroupMessagesService} = groupServices; 

const getGroupMessagesController = async (req, res,next) => {
    const {groupid} = req.params;
    const {datefrom} = req.query
    try{
        const groupMessages = await getGroupMessagesService(groupid, datefrom);
        res.json(groupMessages)
    }catch (error) {
        console.log('Error in getGroupMessagesController',error)
        next(error)
    }
    
}
module.exports = getGroupMessagesController;