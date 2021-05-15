const jwt = require("jsonwebtoken");
const { jwt_secret_key } = require("../../config/index");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwt_secret_key, (err, decoded) => {
      // if (err) {
      //   return res.sendStatus(403);
      // }

      // const { id, isTeacher } = decoded;
      // if (!isTeacher) {
      //   return res.sendStatus(403);
      // }
      
      req.user = { id: 28, isTeacher: true };
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
