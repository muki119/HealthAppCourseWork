const {groupServices} = require('../../Services')
const {getGroupMessagesService} = groupServices; 
const { validationResult } = require('express-validator');

const getGroupMessagesController = async (req, res,next) => {

    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
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