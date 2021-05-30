const mysql = require("mysql");
const {
  host,
  mysql_user,
  mysql_port,
  mysql_password,
  database_name,
} = require("./index");

class Database {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: host,
      user: mysql_user,
      port: mysql_port,
      password: mysql_password,
      database: database_name,
      debug: false,
      multipleStatements: true 
    });

    this.executeQuery = async function(query) {
      return new Promise((resolve) =>
        this.pool.query(query, function(err, response, fields) {
          resolve({ error: err, response: response });
        })
      );
    };
  }
}

module.exports = Database;
