const bcrypt = require("bcrypt");

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
}

/**
 * Generate password hash and salt from raw password passed as first parameter and return them 
 * @param {*} password 
 */
const hashPasswordAsync = async password => {
    const saltRounds = 10;
  
      const passwordSalt = await bcrypt.genSalt(saltRounds)
      const passwordHash = await bcrypt.hash(password, passwordSalt)
  
    return { passwordHash, passwordSalt }
  }

module.exports = {
    checkPassword,
    hashPasswordAsync
}