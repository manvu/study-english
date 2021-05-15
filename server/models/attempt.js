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

  async addOne(quizId, userId, attemptId) {
    return await this.db.executeQuery(
      `INSERT INTO user_attempt (quiz_id, user_id, attempt_id) VALUES ('${quizId}', '${userId}', '${attemptId}')`
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

  async addPlaceHolder(quizId, userId, attemptId, numberOfQuestions) {
    let query = `INSERT INTO user_answer_question (quiz_id, user_id, attempt_id, question_id, answer_text) VALUES `;

    for (let i = 1; i <= numberOfQuestions; i++) {
      query = query.concat(
        `('${quizId}', '${userId}', '${attemptId}', '${i}', ''), `
      );
    }

    let formattedQuery = query.substring(0, query.length - 2);

    console.log(formattedQuery);

    return await this.db.executeQuery(formattedQuery);
  }
}

module.exports = AttemptModel;