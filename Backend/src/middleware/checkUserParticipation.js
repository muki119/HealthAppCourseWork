const {checkUserParticipationHelper} = require('../helpers')
const checkUserParticipationMiddleware = async (req,res,next) => {
    try {
        const userId = req.session.user.id
        const {groupid} = req.params;
        const isParticipant = await checkUserParticipationHelper(userId,groupid);
        if (!isParticipant){
            return res.status(401).json({'error':'Unauthorised access.'});
        }
        next();
    } catch (error) {
        console.error('Error in checkUserParticipationMiddleware:', error);
        next(error)

    }
}


module.exports = checkUserParticipationMiddleware