const STRINGS = require("../../config/strings");
const { sendSuccess, sendFailure } = require("../../config/res");
const helper = require("../../misc/helper");
const { datetime_format } = require("../../config/index");
const moment = require("moment");
const QuizModel = new (require("../../models/quiz"))();
const RatingModel = new (require("../../models/rating"))();
const FavoriteModel = new (require("../../models/favorite"))();
const QuestionModel = new (require("../../models/question"))();
const AttemptModel = new (require("../../models/attempt"))();
const UserAnswerModel = new (require("../../models/user_answer"))();
const CorrectAnswerModel = new (require("../../models/correct_answer"))();
const validator = require("../validators/validator");
const { cleanObject } = require("../../misc/helper");

async function markFavorite({ quizId, userId }) {
  const favorite = await FavoriteModel.addOne(quizId, userId);

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

async function createNewAttempt(data) {
  const { hasCompleted, latestAttempt, questionIds, quizId, userId } = data;

  const newAttemptId = hasCompleted
    ? latestAttempt.response[0].attempt_id + 1
    : 1;
  const newAttemptData = {
    quizId,
    userId,
    attemptId: newAttemptId,
    questionIds,
    startTime: moment(Date.now()).format(datetime_format),
  };

  const newAttempt = await AttemptModel.addOne(newAttemptData);

  const addPlaceHolder = await AttemptModel.addManyPlaceholders(newAttemptData);

  if (!newAttempt.error && !addPlaceHolder.error) {
    const newAttempt = await UserAnswerModel.findAll(newAttemptData);
    return newAttempt.response;
  } else {
    return false;
  }
}

async function loadIncompleteAttempt(data) {
  const { latestAttempt, quizId, userId } = data;

  const attemptId = latestAttempt.response[0].attempt_id;

  const userAnswerData = { quizId, userId, attemptId };

  const questions = await QuestionModel.findManyByQuizId(userAnswerData);
  const questionsContent = await QuestionModel.loadContent(quizId);
  const userAnswerQuestions = await UserAnswerModel.findAll(userAnswerData);

  if (
    !questionsContent.error &&
    !questions.error &&
    !userAnswerQuestions.error
  ) {
    return {
      questions: questions.response,
      questionsContent: questionsContent.response,
      userAnswerQuestions: questionsContent.response,
    };
  } else {
    return false;
  }
}

function convertToObject(object) {
  let resObject = {};

  for (const currentItem of object) {
    if (resObject[currentItem.question_id]) {
      resObject[currentItem.question_id].push(currentItem);
    } else {
      resObject[currentItem.question_id] = [currentItem];
    }
  }

  return resObject;
}

module.exports = {
  startQuiz: async (quizId, userId) => {
    let latestAttempt = await AttemptModel.findLatest(quizId, userId);
    const hasCompleted =
      latestAttempt.response.length === 1 &&
      latestAttempt.response[0].end_time !== null;
    const hasNeverTaken = latestAttempt.response.length === 0;

    if (!latestAttempt.error) {
      if (hasCompleted || hasNeverTaken) {
        // User has never attempted this quiz or has completed the quiz
        const questions = await QuestionModel.findManyByQuizId({ quizId });
        let questionsContent = await QuestionModel.loadContent(quizId);

        const questionIds = questions.response.map((q) => q.question_id);

        if (questionIds.length > 0) {
          const data = {
            hasCompleted,
            latestAttempt,
            questionIds,
            quizId,
            userId,
          };
          const newAttempt = await createNewAttempt(data);

          const questions = await QuestionModel.findManyByQuizId({
            quizId,
            userId,
            attemptId: newAttempt[0].attempt_id,
          });

          const response = questions.response;

          questionsContent = helper.cleanObject(questionsContent.response);

          let resObject = {};

          for (const currentItem of questionsContent) {
            if (resObject[currentItem.question_id]) {
              resObject[currentItem.question_id].push(currentItem);
            } else {
              resObject[currentItem.question_id] = [currentItem];
            }
          }

          for (const question of response) {
            question.content = resObject[question.question_id];
          }

          return sendSuccess(response);
        } else {
          return sendFailure(STRINGS.ERROR_OCCURRED);
        }
      } else {
        // User has attempted this quiz but has not completed it
        const data = { latestAttempt, quizId, userId };
        const incompleteAttempt = await loadIncompleteAttempt(data);

        if (incompleteAttempt === false) {
          return sendFailure(STRINGS.ERROR_OCCURRED);
        } else {
          const { questions, userAnswerQuestions } = incompleteAttempt;

          const response = questions;

          const questionsContent = helper.cleanObject(
            incompleteAttempt.questionsContent
          );

          let resObject = {};

          for (const currentItem of questionsContent) {
            if (resObject[currentItem.question_id]) {
              resObject[currentItem.question_id].push(currentItem);
            } else {
              resObject[currentItem.question_id] = [currentItem];
            }
          }

          for (const question of response) {
            question.content = resObject[question.question_id];
          }

          return sendSuccess(response);
        }
      }
      // } else {
      //   return sendFailure(STRINGS.ERROR_OCCURRED);
      // }
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
    const {} = data;

    if (!validator.validateIsActiveQuestion(data.isActive)) {
      return sendFailure(STRINGS.INVALID_IS_ACTIVE_VALUE);
    }

    const isActive = data.isActive === true ? 1 : 0;

    let quiz = await QuizModel.addOne({ ...data, isActive });

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
      timeAllowed,
      skillId,
      userId,
    } = data;

    if (!validator.validateIsActiveQuestion(data.isActive)) {
      return sendFailure(STRINGS.INVALID_IS_ACTIVE_VALUE);
    }

    const isActive = data.isActive === true ? 1 : 0;

    const quiz = await QuizModel.saveOne({ ...data, isActive });

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
      if (status.response[0].favorite === 0) {
        return markFavorite(data);
      } else if (status.response[0].favorite === 1) {
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

    const ratingFound = await RatingModel.findOne(quizId, userId);

    if (!ratingFound.error) {
      const data = { quizId, userId, ratingGiven };
      if (ratingFound.response.length === 0) {
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
    const { quizId, userId, attemptId } = data;

    const getCorrectAnswers = await CorrectAnswerModel.findAll(quizId);
    const userAnswerQuestions = await UserAnswerModel.findAll(data);
    const response = { detailedAnswers: [], result: [], grade: null }

    if (!getCorrectAnswers.error && !userAnswerQuestions.error) {
      // 1 - correct, 2 - partially correct, 3 - incorrect, 4 - unanswered
      const result = { correct: 0, partial: 0, incorrect: 0, unanswered: 0 };
      const correctAnswers = convertToObject( cleanObject(getCorrectAnswers.response) );
      const userAnswers = userAnswerQuestions.response;
      const userAnswersModels = []
      let markedResult

      for (const { answer_text, type_id, question_id } of userAnswers) {
        const corrects = type_id === 3 ?  correctAnswers[question_id][0].correct_answers.split(" ") .map((a) => a.split(".")) : correctAnswers[question_id]

        if (answer_text === "") {
          result.unanswered += 1;
          markedResult = 4

          if (type_id === 1) {
            response.detailedAnswers.push({answers: corrects.map(c => ({...c, marked: 0 === c.is_correct_choice, user_answer: 0}))})
          } else if (type_id === 2) {
            response.detailedAnswers.push({answers: corrects })
          } else if (type_id === 3) {
            response.detailedAnswers.push({answers: corrects.map((c,i) => ({ type_id: 3, sequence_id: i + 1, correct_answer: c[1]}))})

          }
        } else {
          response.detailedAnswers.push({})
          const index = response.detailedAnswers.length - 1

          if (type_id === 1) {
            const selectedOptions = answer_text.split(',').map(i => parseInt(i) ? parseInt(i) : i)
            const marked = selectedOptions.map((o) => corrects[o - 1].is_correct_choice === 1)
            
            for (const correct of corrects) {
              const isSelected = selectedOptions.includes(correct.choice_id) 
              if ((isSelected && correct.is_correct_choice === 1) || (!isSelected && correct.is_correct_choice === 0)) {
                  correct.marked = true 
              } else {
                  correct.marked = false
              }
          }
              

            response.detailedAnswers[index].answers = corrects;
            
            if (marked.length === corrects.filter(c => c.is_correct_choice === 1).length && marked.every(m => m === true)) {
              
              markedResult = 1;
              result.correct += 1
            } else if (marked.every(m => m === false)) {
              markedResult = 2
              result.incorrect += 1
            } else {
              markedResult = 3
              result.partial += 1
            }
          } else if (type_id === 2) {
            const answers = answer_text.split(",").map((a) => a.split("."));
            const marked = answers.map((item, i) => item[1].toLowerCase().trim() === corrects[i].correct_answer.toLowerCase().trim())

            response.detailedAnswers[index].answers = corrects
            
            for (let i = 0; i < marked.length; i++) {
              response.detailedAnswers[index].answers[i].user_answer = answers[i][1]
              response.detailedAnswers[index].answers[i].marked = marked[i]
            }

            if (marked.every(m => m === true)) {
              markedResult = 1;
              result.correct += 1
            } else if (marked.every(m => m === false)) {
              markedResult = 2
              result.incorrect += 1
            } else {
              markedResult = 3
              result.partial += 1
            }
          } else if (type_id === 3) {
            const answers = answer_text.split(" ").map((a) => a.split("."));
            const marked = answers.map((item, i) => item[1] === corrects[i][1])

            response.detailedAnswers[index].answers = corrects.map(c => ({ correct_answer: c[1]}))
            
            for (let i = 0; i < marked.length; i++) {
              response.detailedAnswers[index].answers[i].type_id = 3
              response.detailedAnswers[index].answers[i].sequence_id = i + 1
              response.detailedAnswers[index].answers[i].user_answer = answers[i][1]
              response.detailedAnswers[index].answers[i].marked = marked[i]
            }

            if (marked.length === corrects.length && marked.every(m => m === true)) {
              markedResult = 1;
              result.correct += 1
            } else if (marked.every(m => m === false)) {
              markedResult = 2
              result.incorrect += 1
            } else {
              markedResult = 3
              result.partial += 1
            }
          }
        }

        const ua = { quizId, userId, attemptId, questionId: question_id, markedResult}

        userAnswersModels.push(ua)
      }

      const numQuestions = Object.keys(correctAnswers).length;
      const eachQuestionMark = 100 / numQuestions
      const grade = result.correct === numQuestions ? 100 : (eachQuestionMark * result.correct + (eachQuestionMark / 2) * result.partial)

      const updateMarked = await UserAnswerModel.markOne(userAnswersModels)
      const attemptData = { userId, quizId, attemptId, endTime: moment(Date.now()).format(datetime_format), grade };
      const closeAttempt = await AttemptModel.closeOne(attemptData)

      if(!updateMarked.error && !closeAttempt.error) {
        response.result = result
        response.result.total = numQuestions
        response.accuracy = grade
        response.quiz_id = quizId
        response.attempt_id = attemptId
        response.userAnswers = userAnswers

  
        return sendSuccess(response)
      } else {
        return sendFailure(STRINGS.ERROR_OCCURRED)
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED)
    }
  },
};
