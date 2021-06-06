const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const { getAvatarUrl } = require("../../misc/helper");
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
      for (const thread of threads.response) {
        if (thread.thread_starter_avatar_url === "default-profile-picture.png") {
          thread.thread_starter_avatar_url = getAvatarUrl(thread.first_name)
        }
      }

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
