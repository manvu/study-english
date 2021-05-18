const database = new (require("../config/database"))();

class StatisticsModel {
  constructor() {
    this.db = database;
  }

  async findQuizOne(userId) {
    return await this.db.executeQuery(`SELECT (SELECT COUNT(*) FROM quiz) as number_of_quizzes, 
    (SELECT COUNT(*) FROM user_attempt ua WHERE ua.user_id = ${userId} AND ua.end_time IS NULL) as incomplete,
    (SELECT COUNT(*) FROM user_attempt ua WHERE ua.user_id = ${userId} AND ua.end_time IS NOT NULL) as completed`)
  }

  async findAnswerOne(userId) {
      return await this.db.executeQuery(`SELECT  
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 1) as correct,
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 2) as partially_correct,
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 3) as incorrect,
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 4) as unanswered`)
  }
  async findBoardStatisticsByQuiz(quizId) {
    return await this.db.executeQuery(`SELECT start_time, grade
    FROM user_attempt ua
    WHERE quiz_id = ${quizId} AND ua.end_time IS NOT NULL`)
  }
  
  async findBoardStatisticsSummaryByQuiz(quizId) {
    
  }
}

module.exports = StatisticsModel;