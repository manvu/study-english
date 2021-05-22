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
        if (err.name === "TokenExpiredError") {
          return res.status(403).send({ error: err.name });
        }
        if (guestAccessibleURLs[req.originalUrl]) {
          next()
          return
        } 
        return res.status(403).send({ error: err.name });
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
