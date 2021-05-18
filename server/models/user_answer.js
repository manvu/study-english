const database = new (require("../config/database"))();

class UserAnswerModel {
  constructor() {
    this.db = database;
  }

  async findAll({quizId, userId, attemptId}) {
    return await this.db.executeQuery(`SELECT ua.*, q.type_id
    FROM user_answer_question ua JOIN question q ON q.question_id = ua.question_id
    WHERE ua.quiz_id = ${quizId} AND ua.user_id = ${userId} AND ua.attempt_id = ${attemptId} 
    ORDER BY ua.question_id ASC`);
  }

  async closeOne({quizId, userId, attemptId, grade}) {
    return await this.db.executeQuery(``);
  }

  async markOne({items, userId, quizId, attemptId}) {
    let query = `INSERT INTO user_answer_question 
    (user_id, quiz_id, attempt_id, question_id, answer_text, is_correct)
    VALUES `;

    for (let i = 0; i < items.length; i++) {
      query = query.concat(
        `(${userId}, ${quizId}, '${attemptId}', '${items[i][0]}', '', '${items[i].marked}'), `
      );
    }

    let formattedQuery = query.substring(0, query.length - 2);
    formattedQuery +=
      " ON DUPLICATE KEY UPDATE is_correct = VALUES(is_correct)";

    console.log(formattedQuery);

    return await this.db.executeQuery(formattedQuery);
  }

  async saveOne({ quizId, userId, attemptId, questionId, answerText }) {
    return await this.db.executeQuery(`UPDATE user_answer_question
    SET answer_text = '${answerText}'
    WHERE quiz_id = ${quizId} AND user_id = ${userId} AND attempt_id = ${attemptId} AND question_id = ${questionId}`);
  }
}

module.exports = UserAnswerModel;
