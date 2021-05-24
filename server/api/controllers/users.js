const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const UserModel = new (require("../../models/user"))();
const MimeTypeModel = new (require("../../models/mime_type"))();
const {
  validateEmail,
  validatePassword,
  validateProfilePictureId,
  validateGender,
  validateRoleId,
  validateName,
  validateNewPassword,
} = require("../validators/validator");
const { hashPasswordAsync, checkPassword } = require("../../misc/helper");

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
    const { id, email, firstName, lastName, gender } = data;

    if (!validateName(firstName)) {
      return sendFailure(STRINGS.PLEASE_CHECK_YOUR_FIRST_NAME);
    }

    if (!validateName(lastName)) {
      return sendFailure(STRINGS.PLEASE_CHECK_YOUR_LAST_NAME);
    }

    if (!validateEmail(email)) {
      return sendFailure(STRINGS.EMAIL_IS_NOT_IN_CORRECT_FORMAT);
    }
    if (!validateGender(gender)) {
      return sendFailure(STRINGS.INVALID_GENDER);
    }

    const userInfo = await UserModel.saveOne(
      id,
      email,
      firstName,
      lastName,
      gender
    );

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

  updatePassword: async (data) => {
    const { id, currentPassword, newPassword } = data;

    const validated = validateNewPassword(currentPassword, newPassword);

    if (validated === true) {
      const passwordInfo = await hashPasswordAsync(newPassword);

      const userInfo = await UserModel.savePassword({
        userId: id,
        ...passwordInfo,
      });

      if (userInfo.response.affectedRows === 1) {
        return sendSuccess(200);
      } else {
        return sendFailure(STRINGS.CANNOT_SAVE_NEW_PASSWORD);
      }
    } else {
      return sendFailure(
        STRINGS.NEW_PASSWORD_MUST_BE_DIFFERENT_FROM_OLD_PASSWORD_AND_AT_LEAST_8_CHARACTERS
      );
    }
  },
};
