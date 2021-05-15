const database = new (require("../config/database"))();

class QuestionModel {
  constructor() {
    this.db = database;
  }

  async findAll() {
    return await this.db.executeQuery(`SELECT * FROM question_type`);
  }

  async findManyByQuestionId() {}

  async findOneByUserId(userId) {
    return await this.db
      .executeQuery(`SELECT q.*, COALESCE(qm.correct_answers, '') as matching_question_correct_answers, qt.type_name, qi.instruction
    FROM question q 
    LEFT JOIN question_matching qm ON q.question_id = qm.question_id
    JOIN question_type qt ON q.type_id = qt.type_id
    JOIN question_instruction qi ON q.instruction_id = qi.instruction_id
    WHERE q.question_id = ${userId}`);
  }

  async loadContent(quizId) {
    return await this.db
      .executeQuery(`SELECT q.question_id, qmc.choice_id, qmc.choice_text, qgf.sequence_id , qms.letter, qms.subquestion_id, qms.text, qms.column_assigned
    FROM question q 
    JOIN quiz_question qq ON qq.question_id = q.question_id 
    JOIN question_instruction qi ON q.instruction_id = qi.instruction_id
    LEFT JOIN question_multiple_choice qmc ON q.question_id =  qmc.question_id
    LEFT JOIN question_gap_filling qgf ON q.question_id = qgf.question_id
    LEFT JOIN question_matching_sub qms ON q.question_id = qms.question_id
    WHERE qq.quiz_id = ${quizId} AND q.is_active = 1
    ORDER BY q.question_id, qmc.choice_id, qgf.sequence_id, qms.subquestion_id`);
  }

  async findManyByQuizId(quizId, userId, attemptId) {
    if (attemptId && userId) {
      return await this.db
        .executeQuery(`SELECT q.question_id, q.type_id, qt.type_name, q.is_active, q.paragraph_title, q.question, qi.instruction, uaq.*
            FROM question q 
            JOIN quiz_question qq ON qq.question_id = q.question_id 
            JOIN question_instruction qi ON q.instruction_id = qi.instruction_id
            JOIN question_type qt ON q.type_id = qt.type_id 
            JOIN user_answer_question uaq ON uaq.question_id = q.question_id
            WHERE qq.quiz_id = '${quizId}' AND q.is_active = 1 AND uaq.user_id = '${userId}' AND uaq.attempt_id = '${attemptId}'
            ORDER BY q.question_id`);
    } else {
      return await this.db
        .executeQuery(`SELECT q.question_id, q.type_id, qt.type_name, q.is_active, q.paragraph_title, q.question, qi.instruction
            FROM question q 
            JOIN quiz_question qq ON qq.question_id = q.question_id 
            JOIN question_instruction qi ON q.instruction_id = qi.instruction_id
            JOIN question_type qt ON q.type_id = qt.type_id 
            WHERE qq.quiz_id = ${quizId} AND q.is_active = 1
            ORDER BY q.question_id`);
    }
  }

  async findNumberOfQuestions() {
    return await this.db.executeQuery(`SELECT quiz.quiz_id,
    (SELECT COUNT(*) FROM quiz_question WHERE quiz.quiz_id = quiz_question.quiz_id) AS 'number_of_questions'
    FROM quiz`);
  }

  async addOne({ typeId, instructionId, isActive, paragraphTitle, question }) {
    return await this.db
      .executeQuery(`INSERT INTO question(type_id, instruction_id, is_active, paragraph_title, question) 
    VALUES ('${typeId}', '${instructionId}', '${isActive}', ${
      !paragraphTitle ? "NULL" : paragraphTitle
    }, '${question}')`);
  }
}

module.exports = QuestionModel;
