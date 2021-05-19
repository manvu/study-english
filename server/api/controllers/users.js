const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const UserModel = new (require("../../models/user"))();

module.exports = {
  getUsers: async () => {
    const users = await UserModel.findAll();

    if (!users.error) {
      return sendSuccess(users.response);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },

  getAllStudents: async () => {
    const students = await UserModel.findAllStudents();

    if (!students.error) {
      return sendSuccess(students.response);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },

  getUser: async (id) => {
    let user = await UserModel.findOneById(id);

    if (!user.error) {
      if (user.response.length === 0) {
        return sendFailure(STRINGS.ERROR_OCCURRED);
      } else {
        return sendSuccess(user.response[0]);
      }
    }
  },

  updateUser: async (data) => {
    const { id, email, firstName, lastName, password } = data;

    if (!email || !password) {
      return sendFailure(STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK);
    }

    let userInfo;
    if (password) {
      const { passwordHash, passwordSalt } = await hashPasswordAsync(password);
      userInfo = await UserModel.saveOne({
        ...data,
        passwordHash,
        passwordSalt,
      });
    } else {
      userInfo = await UserModel.saveOne({ id, email, firstName, lastName });
    }

    if (!userInfo.error) {
      if (userInfo.response.affectedRows === 1) {
        return sendSuccess(200);
      } else {
        return sendFailure(STRINGS.CANNOT_SAVE_USER_INFO);
      }
    } else {
      return sendFailure(STRINGS.CANNOT_SAVE_USER_INFO);
    }
  },
};
