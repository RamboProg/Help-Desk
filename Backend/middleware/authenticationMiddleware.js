const jwt  = require("jsonwebtoken");
const secretKey = "S12k4r4,.;lp";

module.exports = function authenticationMiddleware(req, res, next) {
   const cookie = req.cookies;

   // For Testing
   // console.log("Cookie: ", cookie);
   // console.log(req.headers);
    
   if (!cookie)
   {
        return res.status(401).json({ message: "No cookie found" });
   }
   const token = cookie.token;
   if (!token)
   {
        return res.status(405).json({ message: "No token found" });
   }
   jwt.verify(token, secretKey, (err, decoded) => {
        if (err)
        {
            return res.status(403).json ({ message: "Invalid token" });
        }
        req.user =decoded.user;
        next();
    });
}
