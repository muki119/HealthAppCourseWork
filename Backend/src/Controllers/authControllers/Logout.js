const {logoutService} = require('../../Services')
const logoutController = async (req,res,next)=>{
    // get userid  
    // update last online to the current time
    try {
        const userId = req.session.user.id;
        await logoutService(userId); // update last online to now 
        req.session.destroy((err) => {
            if (err){
                next(err)
            }
            res.status(200).json({message:'Successfully logged out.'})
        });
    } catch (error) {
        next(error)
    }
}

module.exports =  logoutController