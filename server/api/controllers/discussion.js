const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const ThreadModel = new(require("../../models/thread"))();

module.exports = {
  getThreads: async () => {
    const threads = await ThreadModel.findAll();

    if (!threads.error) {
      return sendSuccess(threads);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_THREADS);
    }
  },
};
