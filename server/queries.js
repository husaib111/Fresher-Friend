const { response } = require("express");
const pool = require("./dbconnect");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const getUsers = async (request, response) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users;");
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

const getUserBasicInfo = async (request, response) => {
  try {
    const { userId } = request.params;
    console.log(userId);
    const users = await pool.query(
      "select first_name,middle_name,last_name,course_name,flat_num,block_num,acc_location from users natural join accommodation natural join courses where user_id=$1",
      [userId]
    );

    response.json(users.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getUsersInBlockGroup = async (request, response) => {
  try {
    const { userId } = request.params;
    console.log(userId);
    const users = await pool.query(
      "select first_name from users  where block_num = $1",
      [block_num]
    );

    response.json(users.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getUsersInCourseGroup = async (request, response) => {
  try {
    const { userId } = request.params;
    console.log(userId);
    const users = await pool.query(
      "select first_name from users  where courseId = $1",
      [courseId]
    );

    response.json(users.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const testFunction = async (request, response) => {
  try {
    const token = request.cookies["token"];
    const decoded = jwt.verify(token, "fresherFriend");
    const userEmail = decoded.email;
    console.log(userEmail);
    console.log(token);
    response.json(token);
  } catch (e) {
    console.log(e.message);
  }
};

const testFunction2 = async (request, response) => {
  try {
    const decoded = passport.authenticate("jwt", { session: false });
    const userEmail = decoded.email;
    console.log(decoded);
    console.log(userEmail);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getUsers,
  getUsersByCourse,
  getUsersByAccommodation,
  getUserBasicInfo,
  testFunction,
  testFunction2,
};
