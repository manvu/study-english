const mysql = require("mysql");
const {
  mysql_host,
  mysql_user,
  mysql_port,
  mysql_password,
  database_name,
} = require("./index");

/**
 * Database configuration that is consumed by models
 */
class Database {
  /**
   * Constructor that initializes database configuration
   */
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 30,
      host: mysql_host,
      user: mysql_user,
      port: mysql_port,
      password: mysql_password,
      database: database_name,
      debug: false,
      multipleStatements: true,
    });

    /**
     * Function executes query passed in by model
     * Release a connection when a query is done
     * @param {*} query Query passed in by model
     */
    this.executeQuery = async function(query) {
      return new Promise((resolve) =>
        this.pool.getConnection((err, conn) => {
          if (err) {
            resolve({ error: err, response: null });
          } else {
            this.pool.query(query, function(err, response, fields) {
              conn.end()
              resolve({ error: err, response: response });
            });
          }
        })
      );
    };
  }
}

module.exports = Database;
