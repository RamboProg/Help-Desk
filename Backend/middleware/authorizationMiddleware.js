
module.exports = function authorizationMiddleware(roles){
    return (req,res,next)=>
    {
        console.log('req:', req)
        const userRole = req.user.RoleID;
        if(!roles.includes(userRole)){
            return res.status(403).json({ message: "Unauthorized" });
            next();
        }
        
    }
}