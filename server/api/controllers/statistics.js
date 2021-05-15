const { sendSuccess } = require("../../config/res");
const STRINGS = require("../../config/strings");
const StatisticsModel = new (require("../../models/statistics"))();

module.exports = {
  getStatistics: async (userId) => {
    let quizStats = await StatisticsModel.findQuizOne(userId);
    let answerStats = await StatisticsModel.findAnswerOne(userId);
  
    if (!quizStats.error) {
      return sendSuccess({
        quizStatistics: quizStats.response[0],
        answerStatistics: answerStats.response[0],
      })
    }
  }
}