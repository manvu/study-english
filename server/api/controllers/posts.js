const database = new (require("../../database"))();
const STRINGS = require("../../misc/strings");
const { sendSuccess, sendFailure } = require("../../config/res");

module.exports = {
  createPost: async (data) => {
    const { threadId, content, userId } = data;

    if (!threadId || threadId < 1) {
      return sendFailure(STRINGS.INVALID_THREAD_ID);
    }

    if (!content || content.length === 0) {
      return sendFailure(STRINGS.POST_CONTENT_CANNOT_BE_LEFT_BLANK);
    }

    let newPost = await database.createNewPost(threadId, content, userId);

    if (!newPost.error && newPost.response.affectedRows === 1) {
      const newId = newPost.response.insertId;

      let newPostResponse = await database.getDiscussionPostsByPostIdAsync(
        newId
      );

      if (!newPostResponse.error) {
        return sendSuccess(201, newPostResponse.response[0]);
      } else {
        return sendFailure(STRINGS.ERROR_OCCURRED);
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },

  getPost: async (id) => {
    let post = await database.getDiscussionPostsByPostIdAsync(id);

    return sendSuccess(post.response);
  },
};
