const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const ThreadModel = new (require("../../models/thread"))();
const SkillModel = new (require("../../models/skill"))();
const QuizModel = new (require("../../models/quiz"))();
const UserModel = new (require("../../models/user"))();

module.exports = {
  getDataForDiscussion: async () => {
    const threads = await ThreadModel.findAll();
    const allSkills = await SkillModel.findAll();
    const quizzes = await QuizModel.findAll();
    const users = await UserModel.findAll();

    if (!threads.error && !allSkills.error && !quizzes.error && !users.error) {  
      return sendSuccess({
        threads: threads.response,
        skills: allSkills.response,
        quizzes: quizzes.response,
        users: users.response,
      });
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_THREADS);
    }
  },
  findThreads: async (data) => {
    const { subject, quizId, userId, dateCreated } = data;

    const threads = await ThreadModel.findMany(data);

    if (!threads.error) {
      return sendSuccess(threads.response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_THREADS);
    }
  },
};
