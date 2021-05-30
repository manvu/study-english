const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../..", `.env.${process.env.NODE_ENV}`),
  debug: true,
});

const envFile = {
  vue_app_server_endpoint: process.env.VUE_APP_SERVER_ENDPOINT,
  vue_app_client_endpoint: process.env.VUE_APP_CLIENT_ENDPOINT,
  server_port: process.env.SERVER_PORT,
  client_port: process.env.CLIENT_PORT,
  mysql_host: process.env.MYSQL_HOST,
  mysql_port: process.env.MYSQL_PORT,
  mysql_user: process.env.MYSQL_USER,
  mysql_password: process.env.MYSQL_PASSWORD,
  database_name: process.env.DATABASE_NAME,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_ttl: process.env.REDIS_TTL,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  jwt_expiry_time: process.env.JWT_EXPIRY_TIME ? parseInt(process.env.JWT_EXPIRY_TIME) : 86400,
  password_reset_expiry_time: process.env.PASSWORD_RESET_EXPIRY_TIME,
  datetime_format: process.env.DATETIME_FORMAT,
  appmail: process.env.APPMAIL,
  appmail_password: process.env.APPMAIL_PASSWORD
};

// console.log(envFile)

module.exports = envFile;
