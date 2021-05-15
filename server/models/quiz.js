const database = new (require("../config/database"))();

class QuizModel {
  constructor() {
    this.db = database;
  }

  async findAll() {
    return await this.db.executeQuery("SELECT * FROM discussion_post");
  }

  async findDetailed(quizId) {
    return await this.db.executeQuery(`SELECT quiz.*, quiz_skill.skill_description, 
    (SELECT COUNT(*) FROM user_attempt WHERE user_attempt.quiz_id = quiz.quiz_id) as attempts,
    (SELECT COUNT(*) FROM quiz_question WHERE quiz.quiz_id = quiz_question.quiz_id) AS 'number_of_questions',
    (SELECT AVG(user_rating.rating_given) FROM user_rating WHERE user_rating.quiz_id = quiz.quiz_id GROUP BY quiz_id) as average_rating,
    (SELECT COUNT(user_rating.rating_given) FROM user_rating WHERE user_rating.quiz_id = quiz.quiz_id GROUP BY quiz_id) as rating_count
    FROM quiz JOIN quiz_skill ON quiz.skill_id = quiz_skill.skill_id
    WHERE quiz.quiz_id = ${quizId}`);
  }

  async findOne(id) {
    return await this.db.executeQuery(
      `SELECT (SELECT CONCAT(u.first_name, ' ', u.last_name)) as full_name, dp.created_at as posted_at, u.created_at as member_since, dp.content, 
      (SELECT COUNT(*) FROM discussion_thread dt1 WHERE dt1.user_id = u.user_id) as thread_count,
      (SELECT COUNT(*) FROM discussion_post dp1 WHERE dp1.user_id = u.user_id) as post_count
      FROM discussion_post dp JOIN user u ON dp.user_id = u.user_id
      WHERE dp.post_id = ${id}`
    );
  }


  async addOne({
    courseName,
    description,
    isActive,
    timeAllowed,
    selectedSkillId,
    userId,
  }) {
    return await this.db.executeQuery(`INSERT INTO quiz (course_name, description, is_active, time_allowed, skill_id, created_by) 
    VALUES ('${courseName}', '${description}', '${isActive}', '${timeAllowed}', '${selectedSkillId}', '${userId}')`);
  }

  async saveOne({
    quizId,
    courseName,
    description,
    isActive,
    timeAllowed,
    selectedSkillId,
    userId,
  }) {
    return await this.db.executeQuery(`UPDATE quiz 
    SET course_name = '${courseName}', 
        description = '${description}', 
        is_active = '${isActive}', 
        time_allowed = '${timeAllowed}', 
        skill_id = '${selectedSkillId}', 
        created_by = '${userId}'
    WHERE quiz_id = '${quizId}'`);
  }
}

module.exports = QuizModel;