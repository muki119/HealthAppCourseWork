const {getGroupMessagesService} = require('../../Services');
const getGroupMessagesController = async (req, res) => {
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