const { response } = require("express");
const pg = require("pg");

const config = {
  user: "api",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
};

const pool = new pg.Pool(config);

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.log(pool);
      throw err;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
};
