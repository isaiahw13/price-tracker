const { Pool } = require("pg");
require("dotenv").config();

//create db connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Function to query the db with the connection pool
module.exports = { query: (text, params) => pool.query(text, params) };
