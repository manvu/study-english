const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const HomeModel = new (require("../../models/home"))();

module.exports = {
  getHomeSummary: async (userId) => {
    let homeSummary;
    if (userId) {
      homeSummary = await HomeModel.getHomeSummary(userId);
    } else {
      homeSummary = await HomeModel.getHomeSummaryForGuest();
    }

    if (!homeSummary.error) {
      const response = homeSummary.response;

      return sendSuccess(response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUIZ);
    }
  },
};
