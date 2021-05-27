const database = new (require("../config/database"))();

class AttemptModel {
  constructor() {
    this.db = database;
  }

  async findLatest(quizId, userId) {
    return await this.db.executeQuery(`SELECT attempt_id, start_time, end_time 
    FROM user_attempt 
    WHERE user_id = ${userId} AND quiz_id = ${quizId}
    ORDER BY attempt_id DESC LIMIT 1`);
  }

  async findOne(quizId, userId) {
    return await this.db.executeQuery(`SELECT rating_given FROM user_rating
    WHERE user_rating.user_id = ${userId} AND user_rating.quiz_id = ${quizId}`);
  }

  async findAll() {
    return await this.db.executeQuery(
      `SELECT quiz_id, AVG(user_rating.rating_given) as average_rating, COUNT(user_rating.rating_given) as rating_count FROM user_rating GROUP BY quiz_id`
    );
  }

  async addOne({quizId, userId, attemptId, startTime}) {
    return await this.db.executeQuery(
      `INSERT INTO user_attempt (quiz_id, user_id, attempt_id, start_time) VALUES ('${quizId}', '${userId}', '${attemptId}', '${startTime}')`
    );
  }

  async saveOne({ quizId, userId, ratingGiven }) {
    return await this.db.executeQuery(`UPDATE user_rating 
    SET rating_given = '${ratingGiven}'
    WHERE user_rating.user_id = ${userId} AND user_rating.quiz_id = ${quizId}`);
  }

  async deleteOne(quizId, userId) {
    return await this.db.executeQuery(`DELETE FROM user_rating 
    WHERE user_rating.user_id = ${userId} AND user_rating.quiz_id = ${quizId}`);
  }

  async addOnePlaceholder({quizId, userId, attemptId, questionId}) {
    return await this.db.executeQuery(`INSERT INTO user_answer_question (quiz_id, user_id, attempt_id, question_id, answer_text) 
    VALUES ('${quizId}', '${userId}', '${attemptId}', '${questionId}', '')`)
  }

  async addManyPlaceholders({quizId, userId, attemptId, questionIds}) {
    let query = `INSERT INTO user_answer_question (quiz_id, user_id, attempt_id, question_id, answer_text) VALUES `;

    for (let i = 0; i < questionIds.length; i++) {
      query = query.concat(
        `('${quizId}', '${userId}', '${attemptId}', '${questionIds[i]}', ''), `
      );
    }

    let formattedQuery = query.substring(0, query.length - 2);

    console.log(formattedQuery);

    return await this.db.executeQuery(formattedQuery);
  }

  async closeOne({quizId, userId, attemptId, endTime, grade}) {
    return await this.db.executeQuery(`UPDATE user_attempt 
    SET end_time = '${endTime}', grade = ${grade}, remaining_time = 0
    WHERE quiz_id = ${quizId} AND user_id = ${userId} AND attempt_id = ${attemptId}`);
  }

  async findIncompleteAttempts(quizId) {
    return await this.db.executeQuery(`SELECT user_id, quiz_id, attempt_id FROM user_attempt ua
    WHERE ua.quiz_id = ${quizId} AND ua.end_time IS NULL AND grade IS NULL`)
  }

  async findAllIncompleteAttempts() {
    return await this.db.executeQuery(`SELECT ua.attempt_id, ua.user_id, ua.quiz_id, ua.start_time, q.time_allowed 
    FROM user_attempt ua JOIN quiz q ON ua.quiz_id = q.quiz_id
    WHERE ua.end_time IS NULL 
    ORDER BY start_time`)
  }

  async findIncompleteAttempt(quizId, userId, attemptId) {
    return await this.db.executeQuery(`SELECT ua.attempt_id, ua.user_id, ua.quiz_id, ua.start_time, q.time_allowed 
    FROM user_attempt ua JOIN quiz q ON ua.quiz_id = q.quiz_id
    WHERE ua.quiz_id = ${quizId} AND user_id = ${userId} AND attempt_id = ${attemptId}`)
  }
}

module.exports = AttemptModel;