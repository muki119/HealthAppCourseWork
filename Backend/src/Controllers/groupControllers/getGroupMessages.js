const {groupServices} = require('../../Services')
const {getGroupMessagesService} = groupServices; 

const getGroupMessagesController = async (req, res,next) => {
    const {groupid} = req.params;
    const {datebefore} = req.query
    try{
        const groupMessages = await getGroupMessagesService(groupid, datebefore);
        res.json(groupMessages)
    }catch (error) {
        console.log('Error in getGroupMessagesController',error)
        next(error)
    }
    
}
module.exports = getGroupMessagesController;