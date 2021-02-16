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
      let query = `SELECT user_id, password_hash FROM user WHERE email='${email}'`;

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
  }
}

module.exports = Database;
