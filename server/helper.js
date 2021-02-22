const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkPassword = function(raw, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(raw, hash, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * Generate password hash and salt from raw password passed as first parameter and return them
 * @param {*} password
 */
const hashPasswordAsync = async (password) => {
  const saltRounds = 10;

  const passwordSalt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, passwordSalt);

  return { passwordHash, passwordSalt };
};

function cleanObject(obj) {
  for (let i = 0; i < obj.length; i++) {
    for (var propName in obj[i]) {
      if (obj[i][propName] === null || obj[i][propName] === undefined) {
        delete obj[i][propName];
      }
    }
  }

  return obj;
}

function getUserIdFromToken(authorization) {
  if (authorization) {
    const authorizationString = authorization
    const tokens = authorizationString.split(" ");
    const jwtToken = tokens[1]
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    var userId = decoded.id;
    return userId
  } else {
    return null
  }
}

module.exports = {
  checkPassword,
  hashPasswordAsync,
  cleanObject,
  getUserIdFromToken
};
