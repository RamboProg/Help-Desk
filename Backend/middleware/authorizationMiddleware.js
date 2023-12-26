<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be


const authorizationMiddleware = {

<<<<<<< HEAD
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
=======
module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    console.log('req:', req);
    const userRole = req.user.role;
    if (!roles.includes(userRole)) return res.status(403).json('unauthorized access');
    // console.log('authormid')
    next();
  };
};
>>>>>>> 7292eb3ce3bdd482f8e45edcbac12597a4aa9386
=======
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
>>>>>>> 1fb4084c67f1dd3a3834d8df26ec188505b416be
