const database = new (require("../../database"))();
const STRINGS = require("../../misc/strings");
const { sendSuccess, sendFailure } = require("../../config/res");

module.exports = {
  getHomeSummary: async (userId) => {
    let homeSummary = await database.getHomeSummary(userId);

    if (!homeSummary.error) {
      let response = homeSummary.response;

      return sendSuccess(response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUIZ);
    }
  },
  getQuiz: async (id) => {
    let quiz = await database.getQuizInfoByQuizId(id);

    if (!quiz.error) {
      return sendSuccess(quiz.response[0]);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  createQuiz: async (data) => {
    let quiz = await database.createQuiz(data);

    if (!quiz.error && quiz.response.affectedRows === 1) {
      const newQuizId = quiz.response.insertId;

      return module.exports.getQuiz(newQuizId);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  updateQuiz: async (data) => {
    let quiz = await database.updateQuiz(data);

    if (!quiz.error && quiz.response.affectedRows === 1) {
      return module.exports.getQuiz(quizId);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  toggleFavorite: async (data) => {
    const quizId = data.quizId;
    const userId = data.userId;

    let status = await database.getQuizFavoriteStatus(quizId, userId);

    if (!status.error) {
      if (status.response[0].favorite == 1) {
        return markFavorite(data);
      } else if (status.response[0].favorite == 0) {
        return unmarkFavorite(data);
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  markFavorite: async ({ quizId, userId }) => {
    let favorite = await database.toggleOnFavorite(quizId, userId);

    if (!favorite.error && favorite.response.affectedRows === 1) {
      return sendSuccess(null);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  unmarkFavorite: async ({ quizId, userId }) => {
    let favorite = await database.toggleOffFavorite(quizId, userId);

    if (!favorite.error && favorite.response.affectedRows === 1) {
      return {
        statusCode: 200,
        error: null,
      };
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  setRating: async ({ quizId, userId, ratingGiven }) => {
    let rating = await database.getQuizRating(quizId, userId);

    // Validation

    if (!rating.error) {
      const data = { quizId, userId, ratingGiven };
      if (rating.response.length === 0) {
        let rating = await database.insertQuizRating(data);

        return {
          error: null,
        };
      } else {
        let rating = await database.updateQuizRating(data);

        return {
          error: null,
        };
      }
    } else {
      return {
        error: STRINGS.ERROR_OCCURRED,
      };
    }
  },
  submitAndMark: async ({ quizId, userId, attemptId }) => {
    // compare result

    let getCorrectAnswers = await database.getCorrectAnswers(quizId);
    let userAnswerQuestions = await database.getUserAnswerQuestionByUserIdAndQuizIdAndAttemptId(
      quizId,
      userId,
      attemptId
    );

    let correctAnswers = correctAnswerstoObject(getCorrectAnswers.response);
    let userAnswers = userAnswersToObject(userAnswerQuestions.response);
    let typeArray = userAnswerQuestions.response.map(
      (result) => result.type_id
    );

    console.log(userAnswers);
    console.log(correctAnswers);

    // mark user response

    // 1 - correct, 2 - partially correct, 3 - incorrect, 4 - unanswered
    var userAnswersArray = Object.keys(userAnswers).map((key) => [
      Number(key),
      userAnswers[key],
    ]);
    var correctAnswersArray = Object.keys(correctAnswers).map((key) => [
      Number(key),
      correctAnswers[key],
    ]);

    let marked = mark(userAnswersArray, correctAnswersArray, typeArray);

    let markResponse = await database.markUserAnswerQuestion(
      marked,
      userId,
      quizId,
      attemptId
    );

    let markedArray = [];

    let accuracy = {
      totalSubquestions: 0,
      correctSubquestions: 0,
      incorrectSubquestions: 0,
      percentage: 0,
    };

    for (let i = 0; i < marked.length; i++) {
      let detailedAnswers = [];
      for (let j = 0; j < marked[i][1].length; j++) {
        accuracy.totalSubquestions += 1;
        if (marked[i][3][j].length !== 0) {
          accuracy.correctSubquestions += 1;
        } else {
          accuracy.incorrectSubquestions += 1;
        }

        detailedAnswers.push({
          subquestion_id: j + 1,
          answer: marked[i][1][j],
          correct: marked[i][3][j],
          incorrect: marked[i][4][j],
        });
      }

      console.log(accuracy);

      markedArray.push({
        question_id: marked[i][0],
        answers: detailedAnswers,
        marked: marked[i][2],
        type_id: typeArray[i],
      });
    }

    accuracy.percentage = (
      (accuracy.correctSubquestions * 100) /
      accuracy.totalSubquestions
    ).toFixed(2);

    if (!markResponse.error) {
      return sendSuccess(200, {
        marked: markedArray,
        attempt_id: attemptId,
        quiz_id: quizId,
        accuracy,
      });
    } else {
    }
  },
};
