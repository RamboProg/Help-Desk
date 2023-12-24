

const authorizationMiddleware = {

  authorizationMiddlewareFunction: (roles) => {
      return (req, res, next) => {
        console.log('Authorization Middleware - Request:', req);
        
        const userRole = req.user ? req.user.RoleID : null;
        
        console.log('User Role:', userRole);
        
        if (!roles.includes(userRole)) {
          console.log('Unauthorized Access. User Role:', userRole);
          return res.status(403).json({ message: "Unauthorized" });
        }
    
        console.log('Authorization successful. User Role:', userRole);
        
        next();
      };
    },
  };
    module.exports = authorizationMiddleware;