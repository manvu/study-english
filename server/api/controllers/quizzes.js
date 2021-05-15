const STRINGS = require("../../config/strings");
const { sendSuccess, sendFailure } = require("../../config/res");
const helper = require("../../misc/helper")
const QuizModel = new (require("../../models/quiz"))();
const RatingModel = new (require("../../models/rating"))();
const FavoriteModel = new (require("../../models/favorite"))();
const QuestionModel = new (require("../../models/question"))();
const AttemptModel = new (require("../../models/attempt"))();
const UserAnswerModel = new (require("../../models/user_answer"))();

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
        questions = await QuestionModel.findManyByQuizId(quizId);
        questionsContent = await QuestionModel.loadContent(quizId);

        let numberOfQuestions = questions.response.length;

        if (numberOfQuestions > 0) {
          let newAttemptId =
            latestAttempt.response.length === 1 &&
            latestAttempt.response[0].end_time !== null
              ? latestAttempt.response[0].attemptId + 1
              : 1;

          let newAttempt = await AttemptModel.addOne(quizId, userId, newAttemptId );

          userAnswerQuestions = await AttemptModel.addPlaceHolder(
            quizId,
            userId,
            newAttemptId,
            numberOfQuestions
          );
        } else {
          return sendFailure(STRINGS.ERROR_OCCURRED)
        }
      } else {
        // User has attempted this quiz but has not completed it
        const attemptId = latestAttempt.response[0].attempt_id;

        questions = await QuestionModel.findManyByQuizId( quizId, userId, attemptId );

        questionsContent = await QuestionModel.loadContent(quizId);
        userAnswerQuestions = await UserAnswerModel.findAll( quizId, userId, attemptId );
      }

      if (!questions.error && !questionsContent.error) {
        response = questions.response;

        let questionsContentByQuizIdObject = {};

        for (let i = 0; i < userAnswerQuestions.response.length; i++) {
          response[i].answer_text = userAnswerQuestions.response[i].answer_text;
        }

        for (let i = 0; i < questionsContent.response.length; i++) {
          let currentItem = questionsContent.response[i];
          if (questionsContentByQuizIdObject[currentItem.question_id]) {
            questionsContentByQuizIdObject[currentItem.question_id].push(
              currentItem
            );
          } else {
            questionsContentByQuizIdObject[currentItem.question_id] = [
              currentItem,
            ];
          }
        }

        for (let i = 0; i < response.length; i++) {
          let obj = helper.cleanObject(questionsContentByQuizIdObject[i + 1]);
          response[i].content = obj;
        }

        return sendSuccess(response)
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
    let quiz = await QuizModel.saveOne(data);

    if (!quiz.error && quiz.response.affectedRows === 1) {
      return module.exports.getQuiz(quizId);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  toggleFavorite: async (data) => {
    const quizId = data.quizId;
    const userId = data.userId;

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
  markFavorite: async ({ quizId, userId }) => {
    let favorite = await FavoriteModel.addOne(quizId, userId);

    if (!favorite.error && favorite.response.affectedRows === 1) {
      return sendSuccess(null);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  unmarkFavorite: async ({ quizId, userId }) => {
    let favorite = await FavoriteModel.deleteOne(quizId, userId);

    if (!favorite.error && favorite.response.affectedRows === 1) {
      return sendSuccess(200, null);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  setRating: async ({ quizId, userId, ratingGiven }) => {
    let rating = await RatingModel.findOne(quizId, userId);

    // Validation

    if (!rating.error) {
      const data = { quizId, userId, ratingGiven };
      if (rating.response.length === 0) {
        let rating = await RatingModel.addOne(data);

        return {
          error: null,
        };
      } else {
        let rating = await RatingModel.saveOne(data);

        return {
          error: null,
        };
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED)
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
