const database = new (require("../../database"))();
const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../misc/strings");

async function getQuestionContent(id, typeId) {
  if (typeId === 1) {
    let content = await database.getMultipleChoiceOptions(id);

    if (!content.error) {
      return {
        statusCode: 200,
        error: null,
        response: content.response,
      };
    } else {
      return {
        statusCode: 400,
        error: STRINGS.CANNOT_LOAD_QUESTION,
        response: null,
      };
    }
  } else if (typeId === 2) {
    let content = await database.getGapFillingOptions(id);

    if (!content.error) {
      return {
        statusCode: 200,
        error: null,
        response: content.response,
      };
    } else {
      return {
        statusCode: 400,
        error: STRINGS.CANNOT_LOAD_QUESTION,
        response: null,
      };
    }
  } else {
    let content = await database.getMatchingOptions(id);

    if (!content.error) {
      let leftItems = content.response.filter(
        (item) => item.column_assigned === 1
      );
      let rightItems = content.response.filter(
        (item) => item.column_assigned === 2
      );

      let splits = content.response.matching_question_correct_answers
        .split(" ")
        .map((s) => s.split("."));

      splits.forEach((answer) => {
        let item = leftItems.find((i) => i.letter === answer[0]);
        item.correct_answer = answer[1];
      });

      return {
        statusCode: 200,
        error: null,
        response: {
          leftItems,
          rightItems,
        },
      };
    } else {
      return {
        statusCode: 400,
        error: STRINGS.CANNOT_LOAD_QUESTION,
        response: null,
      };
    }
  }
}

async function createQuestionContent(questionId, typeId, { items }) {
  if (typeId === 1) {
    let content = await database.insertMultipleChoiceItems(items, questionId);

    if (!content.error) {
      return sendSuccess(201, { questionId: createQuestion.response.insertId });
    }
  } else if (typeId === 2) {
    let content = await database.insertGapFillingItems(items, questionId);

    if (!content.error) {
      return sendSuccess(201, { questionId: createQuestion.response.insertId });
    }
  } else if (typeId === 3) {
    let content = await database.createMatchingQuestion(
      correctAnswers,
      questionId,
      shuffleAnswers
    );

    if (!content.error) {
      let insertMatchingItemsResponse = await database.insertMatchingItems(
        items.leftItems,
        items.rightItems,
        questionId
      );

      if (!insertMatchingItemsResponse.error) {
        return sendSuccess(201, {
          questionId: createQuestion.response.insertId,
        });
      }
    }
  }
}

async function createInstruction(instruction) {
  let createInstruction = await database.createInstructionIfNotExists(
    instruction
  );

  if (!createInstruction.error) {
    return sendSuccess(201, createInstruction.response);
  } else {
    return sendFailure(STRINGS.CANNOT_CREATE_INSTRUCTION);
  }
}

async function getInstruction(instruction) {
  if (instructionId === 0) {
    const findInstruction = await database.findInstruction(instruction);

    if (!createInstruction.error) {
      return {
        statusCode: 200,
        error: null,
        response: findInstruction.response,
      };
    } else {
      return {
        statusCode: 400,
        error: STRINGS.CANNOT_CREATE_INSTRUCTION,
        response: null,
      };
    }
  } else {
    return {
      statusCode: 400,
      error: STRINGS.INVALID_INSTRUCTION_ID,
      response: null,
    };
  }
}

module.exports = {
  getQuestion: async (id) => {
    if (!id || id < 1) {
      return {
        statusCode: 400,
        error: STRINGS.INVALID_QUESTION_ID,
        response: null,
      };
    }

    const question = await database.getQuestionById(id);

    if (!question.error) {
      const firstQuestion = question.response[0];
      const typeId = firstQuestion.type_id;
      return await getQuestionContent(id, typeId);
    } else {
      return {
        statusCode: 400,
        error: STRINGS.CANNOT_LOAD_QUESTION,
        response: null,
      };
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

        let createQuestion = await database.createQuestion(d);
        if (!createQuestion.error) {
          // Add items for different types of question
          const questionId = createQuestion.response.insertId;

          return await createQuestionContent(questionId, typeId, items);
        } else {
          return {
            statusCode: 400,
            error: STRINGS.ERROR_OCCURRED,
            response: null,
          };
        }
      } else {
        return {
          statusCode: 400,
          error: STRINGS.CANNOT_CREATE_INSTRUCTION,
          response: null,
        };
      }
    }
  },
  updateAnswer: async (data) => {
    const { questionId, quizId, attemptId, answerText, userId } = data;
    let answer = await database.updateUserAnswerQuestion(data);

    if (!answer.error) {
      if (answer.response.affectedRows === 1) {
        return {
          statusCode: 200,
          error: null,
        };
      }
    }
  },
};
