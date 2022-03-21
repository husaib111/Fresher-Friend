const { response } = require("express");
const pool = require("./dbconnect");
const jwt = require("jsonwebtoken");

const getLoggedUserEmail = (request) => {
  return jwt.verify(request.cookies["token"], "fresherFriend").email;
};

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

const getLoggedInUserBasicInfo = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);
    console.log(userEmail);

    const users = await pool.query(
      "select first_name,middle_name,last_name,course_name,flat_num,block_num,acc_location from users natural join accommodation natural join courses where email=$1",
      [userEmail]
    );

    response.json(users.rows);
  } catch (e) {
    response.status(400).send({
      message: "Not logged in!",
    });
    console.log(e.message);
  }
};

const getLoggedInUserInterests = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const user_ids = await pool.query(
      "SELECT user_id FROM Users WHERE email = $1",
      [userEmail]
    );
    console.log(user_ids);
    const {user_id} = user_ids.rows[0];

    const interests = await pool.query(
      "select interest_name,interest_icon from users natural join user_interests natural join interests where user_id=$1;",
      [user_id]
    );

    response.json(interests.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getUserInterests = async (request, response) => {
  try {
    const { userId } = request.params;
    const userIds = await pool.query(
      "select user_id from users where email=$1",
      [userId+"@student.bham.ac.uk"]
    );
    console.log(userIds);

    const {user_id} = userIds.rows[0];
    // console.log(userId);
    const interests = await pool.query(
      "select interest_name,interest_icon from users natural join user_interests natural join interests where user_id=$1;",
      [user_id]
    );

    response.json(interests.rows);
  } catch (e) {
    console.log(e.message);
  }
};
const getUserBasicInfo = async (request, response) => {
  try {
    const { userId } = request.params;
    console.log(userId);
    const users = await pool.query(
      "select first_name,middle_name,last_name,course_name,flat_num,block_num,acc_location from users natural join accommodation natural join courses where email=$1",
      [userId+"@student.bham.ac.uk"]
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

const getCourseUsers = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const course_ids = await pool.query(
      "SELECT course_id FROM Users WHERE email = $1",
      [userEmail]
    );
    const {course_id} =course_ids.rows[0];


    const courseUsers = await pool.query(
      "SELECT * FROM Users WHERE course_id = $1",
      [course_id]
    );

    response.json(courseUsers.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const testFunction = async (request, response) => {
  try {
    //COPY THE LINE BELOW TO RETRIEVE THE EMAIL OF SIGNED USER
    const userEmail = getLoggedUserEmail(request);

    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      userEmail,
    ]);

    response.json(user);
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
  getLoggedInUserBasicInfo,
  getLoggedInUserInterests,
  getCourseUsers,
  getUserInterests
};
