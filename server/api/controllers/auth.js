const jwt = require("jsonwebtoken");
const { jwt_secret_key, jwt_expiry_time } = require("../../config/index");
const { hashPasswordAsync, checkPassword } = require("../../misc/helper");
const STRINGS = require("../../config/strings");
const { sendSuccess, sendFailure } = require("../../config/res");
const {
  validateEmail,
  validatePassword,
  validateProfilePictureId,
  validateGender,
  validateRoleId,
  validateName,
} = require("../validators/validator");
const UserModel = new (require("../../models/user"))();
const {
  sendPasswordReset,
} = require("../../services/email_notification/passwordReset");
const passwordGenerator = require("generate-password");

module.exports = {
  register: async (data) => {
    const {
      email,
      gender,
      profilePictureId,
      password,
      roleId,
      firstName,
      lastName,
    } = data;

    if (!validateName(firstName)) {
      return sendFailure(STRINGS.PLEASE_CHECK_YOUR_FIRST_NAME);
    }

    if (!validateName(lastName)) {
      return sendFailure(STRINGS.PLEASE_CHECK_YOUR_LAST_NAME);
    }

    if (!validateEmail(email)) {
      return sendFailure(STRINGS.EMAIL_IS_NOT_IN_CORRECT_FORMAT);
    }
    if (!validatePassword(password)) {
      return sendFailure(STRINGS.PASSWORD_MUST_BE_AT_LEAST());
    }
    if (!validateProfilePictureId(profilePictureId)) {
      return sendFailure(STRINGS.INVALID_PROFILE_PICTURE_ID);
    }
    if (!validateGender(gender)) {
      return sendFailure(STRINGS.INVALID_GENDER);
    }
    if (!validateRoleId(roleId)) {
      return sendFailure(STRINGS.INVALID_ROLE_ID);
    }

    // Generate hash and salt out of password
    const { passwordHash, passwordSalt } = await hashPasswordAsync(password);

    // Add a user
    const user = await UserModel.addOne(
      email,
      passwordHash,
      passwordSalt,
      gender,
      roleId,
      profilePictureId,
      firstName,
      lastName
    );
    

    if (!user.error) {
      if (user.response.affectedRows === 1) {
        const userId = user.response.insertId
        const isTeacher = roleId === 1 ? true : false

        const token = jwt.sign(
          { id: userId, isTeacher: isTeacher },
          jwt_secret_key,
          {
            expiresIn: jwt_expiry_time,
          }
        );

        return sendSuccess(201, {
          email,
          roleId,
          profilePictureId,
          gender,
          firstName,
          lastName,
          token,
          isTeacher
        });
      } else {
        return sendFailure(400, STRINGS.REGISTERING_USER_FAILED);
      }
    } else {
      return sendFailure(STRINGS.CANNOT_REGISTER_USER_WITH_EMAIL(email));
    }
  },

  login: async (data) => {
    const { email, password } = data;

    if (!email || !password) {
      return sendFailure(STRINGS.EMAIL_AND_PASSWORD_CANNOT_BE_BLANK);
    }

    // Get user_id and password
    const validatedUser = await UserModel.findOneByEmail(email);

    if (!validatedUser.error) {
      if (validatedUser.response.length === 0) {
        return sendFailure(401, STRINGS.PLEASE_CHECK_YOUR_EMAIL);
      } else {
        const passwordHash = validatedUser.response[0].password_hash;
        const firstName = validatedUser.response[0].first_name;
        const lastName = validatedUser.response[0].last_name;
        const userId = validatedUser.response[0].user_id;
        const isTeacher =
          validatedUser.response[0].role_id === 1 ? true : false;

        const success = await checkPassword(password, passwordHash);

        if (success) {
          let token = jwt.sign(
            { id: userId, isTeacher: isTeacher },
            jwt_secret_key,
            {
              expiresIn: jwt_expiry_time,
            }
          );

          return sendSuccess({ firstName, lastName, isTeacher, email, token });
        } else {
          return sendFailure(401, STRINGS.PLEASE_CHECK_YOUR_PASSWORD);
        }
      }
    } else {
      return sendFailure(401, STRINGS.AUTHENTICATION_FAILED);
    }
  },
  passwordReset: async (data) => {
    const { email } = data;

    if (email) {
      const validatedUser = await UserModel.findOneByEmail(email);

      if (!validatedUser.error) {
        if (validatedUser.response.length === 0) {
          return sendFailure(401, STRINGS.PLEASE_CHECK_YOUR_EMAIL);
        } else {
          const password = passwordGenerator.generate({
            length: 12,
            numbers: true,
            uppercase: true,
          });

          const sendResult = await sendPasswordReset(email, password);

          const statusCode = sendResult.response.substring(0, 3);

          if (statusCode === "250") {
            return sendSuccess(200);
          } else {
            return sendFailure(STRINGS.PLEASE_CHECK_YOUR_EMAIL);
          }
        }
      }
    } else {
      return sendFailure(STRINGS.PLEASE_CHECK_YOUR_EMAIL);
    }
  },
};
