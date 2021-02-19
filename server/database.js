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
      let query = `SELECT quiz.*, quiz_skill.skill_description FROM quiz JOIN quiz_skill ON quiz.skill_id = quiz_skill.skill_id`

      return this.executeQuery(query)
    }
  }
}

module.exports = Database;
