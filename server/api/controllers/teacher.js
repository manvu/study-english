const { sendSuccess, sendFailure } = require("../../config/res");
const STRINGS = require("../../config/strings");
const HomeModel = new (require("../../models/home"))();
const SkillModel = new (require("../../models/skill"))();
const RatingModel = new (require("../../models/rating"))();
const QuestionTypeModel = new (require("../../models/question_type"))();
const QuizModel = new (require("../../models/quiz"))();
const QuestionModel = new (require("../../models/question"))();
const MCModel = new (require("../../models/multiple_choice_option"))();
const GModel = new (require("../../models/gap_filling_option"))();
const MModel = new (require("../../models/matching_option"))();
const InstructionModel = new (require("../../models/instruction"))();
const validator = require("../validators/validator");

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

async function updateQuestionContent(
  questionId,
  typeId,
  items,
  correctAnswers,
  shuffleAnswers
) {
  if (typeId === 1) {
    let content = await MCModel.saveMany(items, questionId);

    if (!content.error) {
      return sendSuccess(201);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  } else if (typeId === 2) {
    let content = await GModel.saveMany(items, questionId);

    if (!content.error) {
      return sendSuccess(201);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  } else if (typeId === 3) {
    let content = await MModel.saveMatchingQuestion(
      correctAnswers,
      questionId
    );

    if (!content.error) {
      let insertItems = await MModel.saveMany(
        [...items.leftItems, ...items.rightItems],
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

async function getQuestionContent(id, typeId, questionData) {
  if (typeId === 1) {
    let content = await MCModel.findMany(id);

    if (!content.error) {
      return sendSuccess({ ...questionData, items: content.response });
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION);
    }
  } else if (typeId === 2) {
    let content = await GModel.findMany(id);

    if (!content.error) {
      return sendSuccess({ ...questionData, items: content.response });
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION);
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

      splits = questionData.matching_question_correct_answers
        .split(" ")
        .map((s) => s.split("."));

      splits.forEach((answer) => {
        let item = leftItems.find((i) => i.letter === answer[0]);
        item.correct_answer = answer[1];
      });

      return sendSuccess({ items: { leftItems, rightItems }, ...questionData });
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION);
    }
  }
}

module.exports = {
  resetRatings: async (quizId) => {
    const questions = await RatingModel.deleteAll(quizId);

    if (!questions.error) {
      return sendSuccess(questions.response);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },

  getQuizForEdit: async (quizId) => {
    const questions = await QuestionModel.findManyByQuizIdForEdit(quizId);

    if (!questions.error) {
      return sendSuccess(questions.response);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  getQuestionForEdit: async (id) => {
    if (!id || id < 1) {
      return sendFailure(STRINGS.INVALID_QUESTION_ID);
    }

    const question = await QuestionModel.findOneForEdit(id);

    if (!question.error) {
      const questionData = question.response[0];
      const typeId = questionData.type_id;
      return await getQuestionContent(id, typeId, {
        ...questionData,
        isActive: questionData.is_active == 1 ? true : false,
      });
    } else {
      return sendFailure(STRINGS.CANNOT_LOAD_QUESTION);
    }
  },
  getTeacherHome: async () => {
    let homeSummary = await QuizModel.findAllForTeacher();
    let allSkills = await SkillModel.findAll();
    let questionTypes = await QuestionTypeModel.findAll();

    if (!homeSummary.error && !allSkills.error && !questionTypes.error) {
      return sendSuccess({
        quizzes: homeSummary.response,
        allSkills: allSkills.response,
        allQuestionTypes: questionTypes.response,
      });
    } else {
      return sendFailure(STRINGS.ERROR_LOADING_TEACHER_PAGE);
    }
  },
  deleteQuiz: async (quizId) => {
    if (!validator.validateQuizId(quizId)) {
      return sendFailure(STRINGS.INVALID_QUIZ_ID);
    }

    const deleteQuiz = await QuizModel.deleteOne(quizId);

    if (!deleteQuiz.error) {
      return sendSuccess(202);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  updateQuestion: async (data) => {
    const { questionId, instruction, isActive, typeId, items, correctAnswers } = data;

    if (!validator.validateQuestionId(questionId)) {
      return sendFailure(STRINGS.INVALID_QUESTION_ID);
    }

    const create = await createInstruction(instruction);

    if (!create.error) {
      let instructionId = create.response.insertId;

      if (instructionId === 0) {
        const findInstruction = await getInstruction(instruction);
        instructionId = findInstruction.response.instruction_id;
      }

      if (instructionId > 0) {
        const isActive = data.isActive === true ? 1 : 0;

        const question = await QuestionModel.saveOne({...data, instructionId, isActive});
        const questionsContent = await updateQuestionContent(questionId,
          typeId,
          items,
          correctAnswers,
          1)

        if (!question.error) {
          return sendSuccess(202);
        } else {
          return sendFailure(STRINGS.ERROR_OCCURRED);
        }
      }
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
  deleteQuestion: async (questionId) => {
    if (!validator.validateQuestionId(questionId)) {
      return sendFailure(STRINGS.INVALID_QUESTION_ID);
    }

    const deleteQuestion = await QuestionModel.deleteOne(questionId);

    if (!deleteQuestion.error) {
      return sendSuccess(202);
    } else {
      return sendFailure(STRINGS.ERROR_OCCURRED);
    }
  },
};
