const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const HomeModel = new(require("../../models/home"))();

module.exports = {
  getHomeSummary: async (userId) => {
    const homeSummary = await HomeModel.getHomeSummary(userId);

    if (!homeSummary.error) {
      let response = homeSummary.response;

      return sendSuccess(response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUIZ);
    }
  }
};
