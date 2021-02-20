const mysql = require("mysql");
const dotenv = require("dotenv").config();

class Database {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 30, //important
      host: process.env.HOST,
      user: process.env.MYSQL_USER,
      port: process.env.MYSQL_PORT,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.DATABASE_NAME,
      debug: false,
    });

    this.executeQuery = async function(query) {
      return new Promise((resolve) =>
        this.pool.query(query, function(err, response, fields) {
          resolve({ error: err, response: response });
        })
      );
    };

    this.validateUserAsync = async function(email) {
      let query = `SELECT user_id, role_id, password_hash, first_name, last_name FROM user WHERE email='${email}'`;

      return this.executeQuery(query)
    };

    this.addUserAsync = async function(
      email,
      passwordHash,
      passwordSalt,
      gender,
      roleId,
      profilePictureId
    ) {
      let query = `INSERT INTO user(email, password_hash, password_salt, gender, role_id, profile_picture_id)  
                   VALUES('${email}', '${passwordHash}', '${passwordSalt}', '${gender}', '${roleId}', '${profilePictureId}')`;

      return this.executeQuery(query);
    };

    this.getUserIdByEmailAsync = async function(email) {
      let query = `SELECT user_id FROM user WHERE {email}`;

      return this.executeQuery(query);
    };

    this.getAllUsersAsync = async function() {
      let query = "SELECT * FROM user";

      return this.executeQuery(query);
    };

    this.hasPrivilegeAsync = async function(email, permission) {
      let query = `SELECT enabled FROM user u
                      JOIN role_permission rp ON u.role_id = rp.role_id 
                      JOIN permission p ON rp.permission_id = p.permission_id
                      WHERE email = '${email}' AND p.permission_name = '${permission}'`;

      return this.executeQuery(query);
    };

    this.getQuizRatings = async function() {
      let query = `SELECT quiz_id, AVG(user_rating.rating_given) as average_rating, COUNT(user_rating.rating_given) as rating_count FROM user_rating GROUP BY quiz_id`

      return this.executeQuery(query)
    }

    this.getNumberOfQuestions = async function() {
      let query = `SELECT quiz.quiz_id,
      (SELECT COUNT(*) FROM quiz_question WHERE quiz.quiz_id = quiz_question.quiz_id) AS 'number_of_questions'
      FROM quiz`

      return this.executeQuery(query)
    }

    this.getQuizInfo = async function() {
      let query = `SELECT quiz.*, quiz_skill.skill_description, 
      (SELECT COUNT(*) FROM user_attempt WHERE user_attempt.quiz_id = quiz.quiz_id) as attempts,
      (SELECT COUNT(*) FROM quiz_question WHERE quiz.quiz_id = quiz_question.quiz_id) AS 'number_of_questions'
      FROM quiz JOIN quiz_skill ON quiz.skill_id = quiz_skill.skill_id`

      return this.executeQuery(query)
    }

    this.getQuestionsByQuizId = async function(quizId) {
      let query = `SELECT q.question_id, q.type_id, qt.type_name, q.is_active, q.paragraph_title, q.question, qi.instruction
      FROM question q 
      JOIN quiz_question qq ON qq.question_id = q.question_id 
      JOIN question_instruction qi ON q.instruction_id = qi.instruction_id
      JOIN question_type qt ON q.type_id = qt.type_id 
      WHERE qq.quiz_id = ${quizId} AND q.is_active = 1
      ORDER BY q.question_id` 

      return this.executeQuery(query)
    }

    this.getQuestionsContentByQuizId = async function(quizId) {
      let query = `SELECT q.question_id, qmc.choice_id, qmc.choice_text, qgf.sequence_id , qms.letter, qms.subquestion_id, qms.text, qms.column_assigned
      FROM question q 
      JOIN quiz_question qq ON qq.question_id = q.question_id 
      JOIN question_instruction qi ON q.instruction_id = qi.instruction_id
      LEFT JOIN question_multiple_choice qmc ON q.question_id =  qmc.question_id
      LEFT JOIN question_gap_filling qgf ON q.question_id = qgf.question_id
      LEFT JOIN question_matching_sub qms ON q.question_id = qms.question_id
      WHERE qq.quiz_id = ${quizId} AND q.is_active = 1
      ORDER BY q.question_id, qmc.choice_id, qgf.sequence_id, qms.subquestion_id`

      return this.executeQuery(query)
    }

    this.getDiscussionThreadsAsync = async function() {
      let query = `SELECT dt.subject, dt.quiz_id, dt.user_id as thread_starter, 
      (SELECT COUNT(*) FROM discussion_post dp WHERE dp.thread_id = dt.thread_id) as replies
      FROM discussion_thread dt`

      return this.executeQuery(query)
    }

    this.getDiscussionThreadsByIdAsync = async function(threadId) {
      let query = `SELECT * FROM discussion_thread dt WHERE dt.thread_id = ${threadId}`
      return this.executeQuery(query)
    }

    this.getDiscussionPostsByThreadIdAsync = async function(threadId) {
      let query = `SELECT (SELECT CONCAT(u.first_name, ' ', u.last_name)) as full_name, dp.created_at as posted_at, u.created_at as member_since, dp.content, 
      (SELECT COUNT(*) FROM discussion_thread dt1 WHERE dt1.user_id = u.user_id) as thread_count,
      (SELECT COUNT(*) FROM discussion_post dp1 WHERE dp1.user_id = u.user_id) as post_count
      FROM discussion_post dp JOIN user u ON dp.user_id = u.user_id
      WHERE dp.thread_id = ${threadId}`
      return this.executeQuery(query)
    }

    this.getQuizStatisticsByUserId = async function(userId) {
      let query = `SELECT (SELECT COUNT(*) FROM quiz) as number_of_quizzes, 
      (SELECT COUNT(*) FROM user_attempt ua WHERE ua.user_id = ${userId} AND ua.end_time IS NULL) as incomplete,
      (SELECT COUNT(*) FROM user_attempt ua WHERE ua.user_id = ${userId} AND ua.end_time IS NOT NULL) as completed`
  
      return this.executeQuery(query)
    }

    this.getAnswerStatisticsByUserId = async function(userId) {
      let query = `SELECT  
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 1) as correct,
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 2) as partially_correct,
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 3) as incorrect,
      (SELECT COUNT(*) FROM user_answer_question uaq WHERE uaq.user_id = ${userId} AND uaq.is_correct = 4) as unanswered`
  
      return this.executeQuery(query)
    }
  }
}

module.exports = Database;
