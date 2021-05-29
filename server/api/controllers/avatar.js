const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const UserModel = new (require("../../models/user"))();
const MimeTypeModel = new (require("../../models/mime_type"))();

module.exports = {
  insertAvatar: async (data) => {
    const image_alt = `${data.userId}''s profile picture`;

    const newAvatar = await MimeTypeModel.addOne({
      image_url: data.savedFilename,
      image_alt,
    });

    if (!newAvatar.error) {
      if (newAvatar.response.affectedRows === 1) {
        return sendSuccess({
          mimeId: newAvatar.response.insertId,
          savedFilename: data.savedFilename,
        });
      } else {
        return sendFailure(STRINGS.ERROR_OCCURRED);
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },

  updateAvatar: async (data) => {
    const updateAvatar = await UserModel.saveProfilePicture(data);

    if (!updateAvatar.error) {
      if (updateAvatar.response.affectedRows === 1) {
        return sendSuccess(204);
      } else {
        return sendFailure(STRINGS.ERROR_OCCURRED);
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
};
