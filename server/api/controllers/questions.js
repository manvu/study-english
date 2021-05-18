const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const UserAnswerModel = new(require("../../models/user_answer"))();
const QuestionModel = new(require("../../models/question"))();
const MCModel = new(require("../../models/multiple_choice_option"))();
const GModel = new(require("../../models/gap_filling_option"))();
const MModel = new(require("../../models/matching_option"))();
const InstructionModel = new(require("../../models/instruction"))();

async function getQuestionContent(id, typeId) {
  if (typeId === 1) {
    let content = await MCModel.findMany(id);

    if (!content.error) {
      return sendSuccess(content.response)
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION)
    }
  } else if (typeId === 2) {
    let content = await GModel.findMany(id);

    if (!content.error) {
      return sendSuccess(content.response)
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION)
    }
  } else {
    let content = await MModel.findMany(id);
    let splits = null;

    if (!content.error) {
      let leftItems = content.response.filter(
        (item) => item.column_assigned === 1
      );
      let rightItems = content.response.filter(
        (item) => item.column_assigned === 2
      );

      splits = content.response.matching_question_correct_answers .split(" ")
        .map((s) => s.split("."));

      splits.forEach((answer) => {
        let item = leftItems.find((i) => i.letter === answer[0]);
        item.correct_answer = answer[1];
      });

      return sendSuccess({ leftItems, rightItems })
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION)
    }
  }
}

async function createQuestionContent(questionId, typeId, { items }, correctAnswers, shuffleAnswers) {
  if (typeId === 1) {
    let content = await MCModel.addMany(items, questionId);

    if (!content.error) {
      return sendSuccess(201, { questionId: createQuestion.response.insertId });
    }
  } else if (typeId === 2) {
    let content = await GModel.addMany(items, questionId);

    if (!content.error) {
      return sendSuccess(201, { questionId: createQuestion.response.insertId });
    }
  } else if (typeId === 3) {
    let content = await MModel.addManyItems(correctAnswers, questionId, shuffleAnswers);

    if (!content.error) {
      let insertItems = await MModel.addManyItems( items.leftItems, items.rightItems, questionId
      );

      if (!insertItems.error) {
        return sendSuccess(201, { questionId: createQuestion.response.insertId });
      }
    }
  }
}

async function createInstruction(instruction) {
  let createInstruction = await InstructionModel.addOne( instruction );

  if (!createInstruction.error) {
    return sendSuccess(201, createInstruction.response);
  } else {
    return sendFailure(STRINGS.CANNOT_CREATE_INSTRUCTION);
  }
}

async function getInstruction(instruction) {
  if (instructionId === 0) {
    const findInstruction = await InstructionModel.findOne(instruction);

    if (!findInstruction.error) {
      return sendSuccess(findInstruction.response);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_INSTRUCTION);
    }
  } else {
    return sendFailure(STRINGS.INVALID_INSTRUCTION_ID);
  }
}

module.exports = {
  getQuestion: async (id) => {
    if (!id || id < 1) {
      return sendFailure(STRINGS.INVALID_QUESTION_ID);
    }

    const question = await QuestionModel.getQuestionById(id);

    if (!question.error) {
      const firstQuestion = question.response[0];
      const typeId = firstQuestion.type_id;
      return await getQuestionContent(id, typeId);
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION);
    }
  },
  createQuestion: async (data) => {
    let typeId = data.typeId;
    let items = data.items;
    let question = data.question;
    let instruction = data.instruction;
    let isActive = data.isActive;
    let paragraphTitle = !!data.paragraphTitle ? null : data.paragraphTitle;
    let correctAnswers = data.correctAnswers;
    let shuffleAnswers = data.shuffleAnswers ? data.shuffleAnswers : 1;

    // First, check if instruction already exists in the database
    const createInstruction = await createInstruction(instruction);

    if (!createInstruction.error) {
      const instructionId = createInstruction.response.insertId;
      const findInstruction = await findInstruction(instructionId);

      instructionId = findInstruction.response[0].instruction_id;

      if (instructionId > 0) {
        // Create Question
        const d = { typeId, instructionId, isActive, paragraphTitle, question };

        let createQuestion = await QuestionModel.addOne(d);
        if (!createQuestion.error) {
          // Add items for different types of question
          const questionId = createQuestion.response.insertId;

          return await createQuestionContent(questionId, typeId, items, correctAnswers, shuffleAnswers);
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
      return sendFailure(200, STRINGS.ERROR_OCCURRED)
    }
  },
};
