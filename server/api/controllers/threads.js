const database = new (require("../../database"))();
const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../misc/strings");

module.exports = {
  createThread: async (data) => {
    const { threadTitle, description, userId, selectedRelatedQuizId } = data;

    if (!threadTitle || threadTitle.length < 20) {
      return sendFailure(STRINGS.THREAD_TITLE_MUST_BE_AT_LEAST_20_CHARACTERS);
    }

    if (!description || description.length === 0) {
      return sendFailure(STRINGS.THREAD_DESCRIPTION_CANNOT_BE_LEFT_BLANK);
    }

    if (!selectedRelatedQuizId || selectedRelatedQuizId < 0) {
      return sendFailure(STRINGS.SELECT_RELATED_QUIZ_CANNOT_BE_LEFT_BLANK);
    }

    let newThread = await database.createNewThread(data);

    if (!newThread.error && newThread.response.affectedRows === 1) {
      const newThreadId = newThread.response.insertId;

      return sendSuccess(201, { newThreadId });
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },

  getThread: async (id) => {
    let thread = await database.getDiscussionThreadsByIdAsync(id);
    let posts = await database.getDiscussionPostsByThreadIdAsync(id);

    return sendSuccess({ ...thread.response[0], posts: posts.response });
  },

  getThreads: async () => {
    let threads = await database.getDiscussionThreadsAsync();

    if (!threads.error) {
      return sendSuccess(threads);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_THREADS);
    }
  },
};
