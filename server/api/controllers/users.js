const database = new (require("../../database"))();
const STRINGS = require("../../misc/strings");

module.exports = {
  getUsers: async () => {
    const users = await database.getAllUsersAsync();

    return {
      statusCode: 200,
      response: users.response,
      error: null,
    };
  },

  getUser: async (id) => {
    let user = await database.getUserInfo(id);

    if (!user.error) {
      if (user.response.length === 0) {
        return {
          statusCode: 400,
          error: STRINGS.ERROR_OCCURRED,
          response: null,
        };
      } else {
        return {
          statusCode: 200,
          error: null,
          response: user.response[0],
        };
      }
    }
  },

  createUser: async (data) => {},

  updateUser: async (data) => {
    const { id, email, firstName, lastName, password } = data;

    if (!email || !password) {

    }

    let userInfo;
    if (password) {
      const { passwordHash, passwordSalt } = await hashPasswordAsync(password);
      userInfo = await database.saveUserInfo(
        id,
        email,
        firstName,
        lastName,
        passwordHash,
        passwordSalt
      );
    } else {
      userInfo = await database.saveUserInfo(id, email, firstName, lastName);
    }

    if (!userInfo.error) {
      if (userInfo.response.affectedRows === 1) {
        return {
          error: null,
        };
      }
    }
  },
};
