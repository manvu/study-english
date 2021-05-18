const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const HomeModel = new(require("../../models/home"))();
const SkillModel = new(require("../../models/skill"))();
const QuestionTypeModel = new(require("../../models/question_type"))();

module.exports = {
  getTeacherHome: async () => {
    let homeSummary = await HomeModel.getHomeSummaryForGuest();
    let allSkills = await SkillModel.findAll();
    let questionTypes = await QuestionTypeModel.findAll();

    if (!homeSummary.error && !allSkills.error && !questionTypes.error) {
      return sendSuccess({
        quizzes: homeSummary.response,
        allSkills: allSkills.response,
        allQuestionTypes: questionTypes.response,
      });
    } else {
      return sendFailure(STRINGS.ERROR_LOADING_TEACHER_PAGE)
    }
  },
};
