const { response } = require("express");
const pool = require("./dbconnect");


const getUsers = async (request, response) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users;");
    response.json(allUsers.rows);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getUsers,
};
