
const getUserController = async(req, res,next) => {
    try{
        // return user data on session storage
        const userData = req.session.user;
        if(!userData){
            return res.status(401).json({error:'Unauthorized'});
        }
        //get all data apart from id 
        const { id, ...userWithoutId } = userData;
        return res.status(200).json(userWithoutId);
    }catch(error){
        next(error)
    }
}


module.exports = getUserController;