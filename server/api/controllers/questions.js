const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const UserAnswerModel = new (require("../../models/user_answer"))();
const QuizQuestionModel = new (require("../../models/quiz_question"))();
const QuestionModel = new (require("../../models/question"))();
const MCModel = new (require("../../models/multiple_choice_option"))();
const GModel = new (require("../../models/gap_filling_option"))();
const MModel = new (require("../../models/matching_option"))();
const InstructionModel = new (require("../../models/instruction"))();
const validator = require("../validators/validator");

async function createQuestionContent(
  questionId,
  typeId,
  items,
  correctAnswers,
  shuffleAnswers
) {
  if (typeId === 1) {
    let content = await MCModel.addMany(items, questionId);

    if (!content.error) {
      return sendSuccess(201);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  } else if (typeId === 2) {
    let content = await GModel.addMany(items, questionId);

    if (!content.error) {
      return sendSuccess(201);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  } else if (typeId === 3) {
    let content = await MModel.addManyItems(
      correctAnswers,
      questionId,
      shuffleAnswers
    );

    if (!content.error) {
      let insertItems = await MModel.addManyItems(
        items.leftItems,
        items.rightItems,
        questionId
      );

      if (!insertItems.error) {
        return sendSuccess(201);
      } else {
        return sendFailure(STRINGS.ERROR_OCCURRED);
      }
    }
  }
}

async function createBridgingQuizAndQuestion(quizId, questionId) {
  const bridge = await QuizQuestionModel.addOne(quizId, questionId);

  if (!bridge.error) {
    return sendSuccess(201, bridge.response);
  } else {
    return sendFailure(STRINGS.CANNOT_CREATE_INSTRUCTION);
  }
}

async function createInstruction(instruction) {
  let createInstruction = await InstructionModel.addOne(instruction);

  if (!createInstruction.error) {
    return sendSuccess(201, createInstruction.response);
  } else {
    return sendFailure(STRINGS.CANNOT_CREATE_INSTRUCTION);
  }
}

async function getInstruction(instruction) {
  const findInstruction = await InstructionModel.findOne(instruction);

  if (!findInstruction.error && findInstruction.response.length === 1) {
    return sendSuccess(findInstruction.response[0]);
  } else {
    return sendFailure(STRINGS.CANNOT_LOAD_INSTRUCTION);
  }
}

module.exports = {
  createQuestion: async (data) => {
    const { typeId, items, question, instruction, quizId } = data;

    if (!instruction) {
      return sendFailure(STRINGS.CANNOT_CREATE_INSTRUCTION);
    }
    if (!validator.validateQuizId(quizId)) {
      return sendFailure(STRINGS.INVALID_QUIZ_ID);
    }
    if (!validator.validateQuestionTypeId(typeId)) {
      return sendFailure(STRINGS.INVALID_QUESTION_TYPE_ID);
    }
    if (!validator.validateQuestion(question)) {
      return sendFailure(STRINGS.CANNOT_CREATE_BLANK_QUESTION);
    }
    if (!validator.validateQuestionItems(typeId, items)) {
      return sendFailure(STRINGS.QUESTION_ITEMS_VALIDATION_ERROR(typeId));
    }
    if (!validator.validateIsActiveQuestion(data.isActive)) {
      return sendFailure(STRINGS.INVALID_IS_ACTIVE_VALUE);
    }

    const isActive = data.isActive === true ? 1 : 0;

    let paragraphTitle = !!data.paragraphTitle ? null : data.paragraphTitle;
    let correctAnswers = data.correctAnswers;
    let shuffleAnswers = data.shuffleAnswers ? data.shuffleAnswers : 1;

    // First, check if instruction already exists in the database
    const create = await createInstruction(instruction);

    if (!create.error) {
      let instructionId = create.response.insertId;

      if (instructionId === 0) {
        const findInstruction = await getInstruction(instruction);
        instructionId = findInstruction.response.instruction_id;
      }

      if (instructionId > 0) {
        // Create Question
        const d = { typeId, instructionId, isActive, paragraphTitle, question };

        let createQuestion = await QuestionModel.addOne(d);
        if (!createQuestion.error) {
          // Add items for different types of question
          const questionId = createQuestion.response.insertId;

          const bridge = await createBridgingQuizAndQuestion(
            quizId,
            questionId
          );
          const content = await createQuestionContent(
            questionId,
            typeId,
            items,
            correctAnswers,
            shuffleAnswers
          );

          if (!bridge.error && !content.error) {
            return sendSuccess(201);
          } else {
            return sendFailure(STRINGS.CANNOT_CREATE_QUESTION);
          }
        } else {
          return sendFailure(STRINGS.ERROR_OCCURRED);
        }
      } else {
        return sendFailure(STRINGS.CANNOT_CREATE_INSTRUCTION);
      }
    }
  },
  updateAnswer: async (data) => {
    const { questionId, quizId, attemptId, answerText, userId } = data;
    const answer = await UserAnswerModel.saveOne(data);

    if (!answer.error) {
      if (answer.response.affectedRows === 1) {
        return sendSuccess(200, null);
      }
    } else {
      return sendFailure(200, STRINGS.ERROR_OCCURRED);
    }
  },
};
