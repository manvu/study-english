const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const HomeModel = new(require("../../models/home"))();
const SkillModel = new(require("../../models/skill"))();
const QuestionTypeModel = new(require("../../models/question_type"))();
const QuestionModel = new(require("../../models/question"))();

module.exports = {
  getQuizForEdit: async(quizId) => {
    const questions = await QuestionModel.findManyByQuizIdForEdit(quizId)

    if (!questions.error) {
      return sendSuccess(questions.response);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  getQuestionForEdit: async(id) => {
    if (!id || id < 1) {
      return sendFailure(STRINGS.INVALID_QUESTION_ID);
    }

    const question = await QuestionModel.findOneForEdit(id);

    if (!question.error) {
      const firstQuestion = question.response[0];
      const typeId = firstQuestion.type_id;
      // return await getQuestionContent(id, typeId);

      return sendSuccess(question.response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION);
    }
  },
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
