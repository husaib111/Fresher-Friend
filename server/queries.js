const { response } = require("express");
const pool = require("./dbconnect");

const getUsers = async (request, response) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users;");
    console.log(allUsers);
    response.json(allUsers.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getUsersByCourse = async (request, response) => {
  try {
    const { courseId } = request.params;
    const users = await pool.query("SELECT * FROM users WHERE course_id = $1", [
      courseId,
    ]);
    response.json(users.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getUsersByAccommodation = async (request, response) => {
  try {
    const { accId } = request.params;
    const users = await pool.query("SELECT * FROM users WHERE acc_id = $1", [
      accId,
    ]);

    response.json(users.rows);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getUsers,
  getUsersByCourse,
  getUsersByAccommodation,
};
