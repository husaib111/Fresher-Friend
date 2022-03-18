const Pool = require("pg").Pool;

const config = {
  user: "api",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
};

const pool = new Pool(config);

module.exports=pool;
