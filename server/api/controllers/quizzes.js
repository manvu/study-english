const STRINGS = require("../../config/strings");
const { sendSuccess, sendFailure } = require("../../config/res");
const helper = require("../../misc/helper");
const { datetime_format } = require("../../config/index")
const moment = require("moment")
const QuizModel = new (require("../../models/quiz"))();
const RatingModel = new (require("../../models/rating"))();
const FavoriteModel = new (require("../../models/favorite"))();
const QuestionModel = new (require("../../models/question"))();
const AttemptModel = new (require("../../models/attempt"))();
const UserAnswerModel = new (require("../../models/user_answer"))();
const CorrectAnswerModel = new (require("../../models/correct_answer"))();

async function markFavorite({ quizId, userId }) {
  let favorite = await FavoriteModel.addOne(quizId, userId);

  if (!favorite.error && favorite.response.affectedRows === 1) {
    return sendSuccess(null);
  } else {
    return sendFailure(STRINGS.ERROR_OCCURRED);
  }
}

async function unmarkFavorite({ quizId, userId }) {
  let favorite = await FavoriteModel.deleteOne(quizId, userId);

  if (!favorite.error && favorite.response.affectedRows === 1) {
    return sendSuccess(200, null);
  } else {
    return sendFailure(STRINGS.ERROR_OCCURRED);
  }
}

module.exports = {
  startQuiz: async (quizId, userId) => {
    let latestAttempt = await AttemptModel.findLatest(quizId, userId);

    if (!latestAttempt.error) {
      let questions;
      let questionsContent;
      let response;
      let userAnswerQuestions;

      if (
        latestAttempt.response.length === 0 ||
        (latestAttempt.response.length === 1 &&
          latestAttempt.response[0].end_time !== null)
      ) {
        // User has never attempted this quiz or has completed the quiz
        questions = await QuestionModel.findManyByQuizId({ quizId });
        questionsContent = await QuestionModel.loadContent(quizId);

        let numberOfQuestions = questions.response.length;

        if (numberOfQuestions > 0) {
          const newAttemptId =
            latestAttempt.response.length === 1 &&
            latestAttempt.response[0].end_time !== null
              ? latestAttempt.response[0].attemptId + 1
              : 1;

          const newAttemptData = { quizId, userId, newAttemptId, numberOfQuestions };

          const newAttempt = await AttemptModel.addOne(newAttemptData);

          userAnswerQuestions = await AttemptModel.addPlaceHolder(
            newAttemptData
          );
        } else {
          return sendFailure(STRINGS.ERROR_OCCURRED);
        }
      } else {
        // User has attempted this quiz but has not completed it
        const attemptId = latestAttempt.response[0].attempt_id;

        const userAnswerData = { quizId, userId, attemptId };

        questions = await QuestionModel.findManyByQuizId(userAnswerData);

        questionsContent = await QuestionModel.loadContent(quizId);
        userAnswerQuestions = await UserAnswerModel.findAll(userAnswerData);
      }

      if (!questions.error && !questionsContent.error) {
        response = questions.response;

        let resObject = {};

        for (let i = 0; i < userAnswerQuestions.response.length; i++) {
          response[i].answer_text = userAnswerQuestions.response[i].answer_text;
        }

        for (let i = 0; i < questionsContent.response.length; i++) {
          let currentItem = questionsContent.response[i];
          if (resObject[currentItem.question_id]) {
            resObject[currentItem.question_id].push(currentItem);
          } else {
            resObject[currentItem.question_id] = [currentItem];
          }
        }

        for (let i = 0; i < response.length; i++) {
          let obj = helper.cleanObject(resObject[i + 1]);
          response[i].content = obj;
        }

        return sendSuccess(response);
      }
    }
  },
  getQuiz: async (id) => {
    let quiz = await QuizModel.findDetailed(id);

    if (!quiz.error) {
      return sendSuccess(quiz.response[0]);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  createQuiz: async (data) => {
    let quiz = await QuizModel.addOne(data);

    if (!quiz.error && quiz.response.affectedRows === 1) {
      const newQuizId = quiz.response.insertId;

      return module.exports.getQuiz(newQuizId);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  updateQuiz: async (data) => {
    const {
      quizId,
      courseName,
      description,
      isActive,
      timeAllowed,
      selectedSkillId,
      userId,
    } = data;

    const quiz = await QuizModel.saveOne(data);

    if (!quiz.error && quiz.response.affectedRows === 1) {
      return module.exports.getQuiz(quizId);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  toggleFavorite: async (data) => {
    const { quizId, userId } = data;
    let status = await FavoriteModel.findOne(quizId, userId);

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
  setRating: async ({ quizId, userId, ratingGiven }) => {
    // Validation
    if (!quizId || !userId || quizId < 1 || userId < 0) {
      return sendFailure(STRINGS.INVALID_QUIZ_ID);
    }

    let rating = await RatingModel.findOne(quizId, userId);

    if (!rating.error) {
      const data = { quizId, userId, ratingGiven };
      if (rating.response.length === 0) {
        const rating = await RatingModel.addOne(data);

        if (!rating.error && rating.response.affectedRows === 1) {
          return sendSuccess(200, null);
        } else {
          return sendFailure(STRINGS.CANNOT_UPDATE_RATING);
        }
      } else {
        const rating = await RatingModel.saveOne(data);

        if (!rating.error && rating.response.affectedRows === 1) {
          return module.exports.getQuiz(quizId);
        } else {
          return sendFailure(STRINGS.CANNOT_UPDATE_RATING);
        }
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  submitAndMark: async (data) => {
    // compare result
    const { quizId, userId, attemptId } = data;

    const getCorrectAnswers = await CorrectAnswerModel.findAll(quizId);
    const userAnswerQuestions = await UserAnswerModel.findAll(data);

    const correctAnswers = helper.correctAnswerstoObject(
      getCorrectAnswers.response
    );
    const userAnswers = helper.userAnswersToObject(
      userAnswerQuestions.response
    );
    const typeArray = userAnswerQuestions.response.map(
      (result) => result.type_id
    );

    // mark user response

    // 1 - correct, 2 - partially correct, 3 - incorrect, 4 - unanswered
    const userAnswersArray = Object.keys(userAnswers).map((key) => [
      Number(key),
      userAnswers[key],
    ]);
    const correctAnswersArray = Object.keys(correctAnswers).map((key) => [
      Number(key),
      correctAnswers[key],
    ]);
    const marked = helper.mark(
      userAnswersArray,
      correctAnswersArray,
      typeArray
    );
    const userAnswerData = { items: marked, userId, quizId, attemptId };
    const attemptData = { userId, quizId, attemptId, endTime: moment(Date.now()).format(datetime_format) };
    const markedArray = [];
    const accuracy = {
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

    attemptData.grade = ((accuracy.correctSubquestions * 100) / accuracy.totalSubquestions );

    accuracy.percentage = attemptData.grade.toFixed(2);

    const markResponse = await UserAnswerModel.markOne(userAnswerData);
    const closedAttempt = await AttemptModel.closeOne(attemptData);

    if (!markResponse.error) {
      return sendSuccess({
        marked: markedArray,
        attempt_id: attemptId,
        quiz_id: quizId,
        accuracy,
      });
    } else {
    }
  },
};
