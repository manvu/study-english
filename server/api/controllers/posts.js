const STRINGS = require("../../config/strings");
const { sendSuccess, sendFailure } = require("../../config/res");
const PostModel = new (require("../../models/post"))();

module.exports = {
  createPost: async (data) => {
    const { threadId, content, userId } = data;

    if (!threadId || threadId < 1) {
      return sendFailure(STRINGS.INVALID_THREAD_ID);
    }

    if (!content || content.length < 30) {
      return sendFailure(STRINGS.CONTENT_MUST_BE_AT_LEAST_30_CHARACTERS);
    }

    let newPost = await PostModel.addOne(threadId, content, userId);

    if (!newPost.error && newPost.response.affectedRows === 1) {
      const newId = newPost.response.insertId;

      let posts = await PostModel.findDetailed(newId);

      if (!posts.error) {
        return sendSuccess(201, posts.response[0]);
      } else {
        return sendFailure(STRINGS.CANNOT_CREATE_POST);
      }
    } else {
      return sendFailure(STRINGS.CANNOT_CREATE_POST);
    }
  },

  getPost: async (id) => {
    if (!id || id < 1) {
      return sendFailure(STRINGS.INVALID_POST_ID)
    }

    let post = await PostModel.findDetailed(id);

    if (!post.error) {
      return sendSuccess(post.response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_POST);
    }
  },

  deletePost: async (id) => {
    if (!id || id < 1) {
      return sendFailure(STRINGS.INVALID_POST_ID)
    }

    let post = await PostModel.deleteOne(id);

    if (!post.error) {
      return sendSuccess(post.response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_POST);
    }
  },
};
