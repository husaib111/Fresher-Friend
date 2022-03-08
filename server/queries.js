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

const getUsersByCourse = (request, response) => {
  try {
    const { courseId } = request.body;
    const users = await pool.query("SELECT * FROM users WHERE course_id = $1", [
      courseId,
    ]);

    response.json(users);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getUsers,
  getUsersByCourse,
};
