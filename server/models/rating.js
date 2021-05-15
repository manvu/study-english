const database = new (require("../config/database"))();

class RatingModel {
  constructor() {
    this.db = database;
  }

  async findOne(quizId, userId) {
    return await this.db.executeQuery(`SELECT rating_given FROM user_rating
    WHERE user_rating.user_id = ${userId} AND user_rating.quiz_id = ${quizId}`)  
  }

  async findAll() {
    return await this.db.executeQuery(`SELECT quiz_id, AVG(user_rating.rating_given) as average_rating, COUNT(user_rating.rating_given) as rating_count FROM user_rating GROUP BY quiz_id`);
  }

  async addOne({quizId, userId, ratingGiven}) {
    return await this.db.executeQuery(`INSERT INTO user_rating (user_id, quiz_id, rating_given) VALUES ('${userId}', '${quizId}', '${ratingGiven}')`)
  }

  async saveOne({quizId, userId, ratingGiven}) {
    return await this.db.executeQuery(`UPDATE user_rating 
    SET rating_given = '${ratingGiven}'
    WHERE user_rating.user_id = ${userId} AND user_rating.quiz_id = ${quizId}`)
  }

  async deleteOne(quizId, userId) {
    return await this.db.executeQuery(`DELETE FROM user_rating 
    WHERE user_rating.user_id = ${userId} AND user_rating.quiz_id = ${quizId}`)
  }
}

module.exports = RatingModel;