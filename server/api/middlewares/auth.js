const jwt = require('jsonwebtoken')
const { jwt_secret_key } = require("../../config/index");

const guestAccessibleURLs = {
  "/home": true,
  "/discussion": true
} 

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, jwt_secret_key, (err, decoded) => {
      
      if (err) {
        if (guestAccessibleURLs[req.originalUrl]) {
          next()
          return
        } 
        return res.sendStatus(403);
      }

      req.user = { id: decoded.id, isTeacher: decoded.isTeacher };

      // req.user = { id: 28, isTeacher: true };
      next();
    });
  } else {
    if (guestAccessibleURLs[req.originalUrl]) {
      next()
    } else {
      res.sendStatus(401);  
    }
  }
};
