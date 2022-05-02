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
    const { user_id } = user_ids.rows[0];

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
      [userId + "@student.bham.ac.uk"]
    );
    console.log(userIds);

    const { user_id } = userIds.rows[0];
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
      [userId + "@student.bham.ac.uk"]
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

const getAccomodationUsers = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const accommodation_ids = await pool.query(
      "SELECT acc_id FROM Users WHERE email = $1",
      [userEmail]
    );
    console.log(accommodation_ids);
    const { acc_id } = accommodation_ids.rows[0];
    console.log(acc_id);

    const courseUsers = await pool.query(
      "SELECT * FROM Users WHERE acc_id = $1",
      [acc_id]
    );
    console.log(courseUsers);

    response.json(courseUsers.rows);
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
    const { course_id } = course_ids.rows[0];

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

const getAccomInfo = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const acc_ids = await pool.query(
      "SELECT acc_id FROM Users WHERE email = $1",
      [userEmail]
    );
    const { acc_id } = acc_ids.rows[0];

    const acc_info = await pool.query(
      "select * from accommodation where acc_id = $1",
      [acc_id]
    );
    console.log(acc_info.rows);
    response.json(acc_info.rows);
  } catch (e) {
    console.log(e.message);
  }
};
const getCourseInfo = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const course_ids = await pool.query(
      "SELECT course_id FROM Users WHERE email = $1",
      [userEmail]
    );
    const { course_id } = course_ids.rows[0];

    const course_info = await pool.query(
      "select * from courses where course_id = $1",
      [course_id]
    );
    console.log(course_info.rows);
    response.json(course_info.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getUserStatus = async (request, response) => {
  try {
    const { userId } = request.params;
    const userEmail = userId + "@student.bham.ac.uk";
    console.log(userEmail);

    const users = await pool.query(
      "select isolating,away,guest,priv from users where email=$1",
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

const getLoggedInUserStatus = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);
    console.log(userEmail);

    const users = await pool.query(
      "select isolating,away,guest,priv from users where email=$1",
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

const postStatus = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);
    console.log("posting" + userEmail);
    var { status } = request.body;
    status = status.map((e) => {
      if (e) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(status);

    const users = await pool.query(
      "update users set isolating=$1, away=$2, guest=$3, priv=$4 where email=$5",
      [status[0], status[1], status[2], status[3], userEmail]
    );

    console.log(users.rows);

    // response.json(users.rows);
  } catch (e) {
    response.status(400).send({
      message: "Not logged in!",
    });
    console.log(e.message);
  }
};

const getEventInfo = async (request, response) => {
  try {
    const { event_id } = request.params;
    console.log("getting " + event_id);
    const info = await pool.query("select * from event where event_id=$1", [
      event_id,
    ]);
    console.log(info.rows);
    response.json(info.rows[0]);
  } catch (e) {
    response.status(400).send({
      message: "Not logged in!",
    });
    console.log(e.message);
  }
};

const insertEventInfo = async (request, response) => {
  try {
    const { eventName, eventLocation, eventStartDate, eventEndDate, invitees } =
      request.body;

    const userEmail = getLoggedUserEmail(request);
    const userIds = await pool.query(
      "select user_id from users where email=$1",
      [userEmail]
    );
    const { user_id } = userIds.rows[0];
    console.log(user_id);

    const users = await pool.query(
      "INSERT INTO event(event_name, location, organiser, starttime, endtime) VALUES ($1, $2, $5, $3, $4) RETURNING event_id",
      [eventName, eventLocation, eventStartDate, eventEndDate, user_id]
    );
    const { event_id } = users.rows[0];
    console.log(event_id);
    await pool.query("INSERT INTO invites(user_id,event_id) values($1,$2)", [
      user_id,
      event_id,
    ]);
    for (var i = 0; i < invitees.length; i++) {
      await pool.query("INSERT INTO invites(user_id,event_id) values($1,$2)", [
        invitees[i],
        event_id,
      ]);
    }

    response.json(users.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const getCourseMessages = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const course_ids = await pool.query(
      "SELECT course_id FROM Users WHERE email = $1",
      [userEmail]
    );
    const { course_id } = course_ids.rows[0];

    console.log("ok to here");
    const messages = await pool.query(
      "SELECT msg_text, posted_at, email, first_name, middle_name, last_name FROM CourseMessages NATURAL JOIN Users WHERE course_id = $1 ORDER BY posted_at ASC",
      [course_id]
    );
    console.log(messages);

    response.json(messages.rows);
  } catch (e) {
    console.log("hgetCourseMessagesi");
    console.log(e.message);
    response.status(400).send({
      message: "Not logged in!",
    });
  }
};

const getAccMessages = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const acc_ids = await pool.query(
        "SELECT acc_id FROM Users WHERE email = $1",
        [userEmail]
    );

    const { acc_id } = acc_ids.rows[0];

    const messages = await pool.query(
        "SELECT msg_text, posted_at, email, first_name, middle_name, last_name FROM AccommodationMessages NATURAL JOIN Users WHERE acc_id = $1 ORDER BY posted_at ASC",
        [acc_id]
    );

    response.json(messages.rows);
  } catch (e) {
    response.status(400).send({
      message: "Not logged in!",
    });
  }
};

const postCourseMessage = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const { message } = request.body;

    const postedMessage = pool.query(
      "INSERT INTO CourseMessages(msg_text, posted_at, course_id, user_id) VALUES ($1, (SELECT CURRENT_TIMESTAMP), (SELECT course_id FROM Users WHERE email = $2), (SELECT user_id FROM Users WHERE email = $2))",
      [message, userEmail]
    );

    response.json(postedMessage.rows);
  } catch (e) {
    response.status(400).send({
      message: "Not logged in!",
    });
  }
};

const postAccMessage = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const { message } = request.body;

    const postedMessage = pool.query(
      "INSERT INTO AccommodationMessages(msg_text, posted_at, acc_id, user_id) VALUES ($1, (SELECT CURRENT_TIMESTAMP), (SELECT acc_id FROM Users WHERE email = $2), (SELECT user_id FROM Users WHERE email = $2))",
      [message, userEmail]
    );

    response.json(postedMessage.rows);
  } catch (e) {
    response.status(400).send({
      message: "Not logged in!",
    });
  }
};

const getAllEvents = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const userIds = await pool.query(
      "select user_id from users where email=$1",
      [userEmail]
    );
    const { user_id } = userIds.rows[0];
    // console.log(user_id);

    const events = await pool.query(
      "select * from event natural join invites where user_id=$1;",
      [user_id]
    );

    console.log(events);

    response.json(events.rows);
  } catch (e) {
    console.log(e.message);
  }
};

const uploadProfilePic = async (request, response) => {
  try {
    const userEmail = getLoggedUserEmail(request);

    const userIds = await pool.query(
      "select user_id from users where email=$1",
      [userEmail]
    );
    const { user_id } = userIds.rows[0];

    await pool.query("insert into profiles(user_id,filename) values ($1,$2)", [
      user_id,
      request.file.filename,
    ]);
    console.log("uploaded photo");
    console.log(request.file.filename);
  } catch (e) {
    console.log(e.message);
  }
};

const createAccount = async (request, response) => {
  try {
    const {
      email,
      password,
      firstName,
      middleName,
      lastName,
      courseId,
      accId,
    } = request.body;

    if (middleName) {
      const newUser = pool.query(
        "INSERT INTO users (email, first_name, middle_name, last_name, course_id, acc_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [email, firstName, middleName, lastName, courseId, accId]
      );
      console.log(newUser);
      console.log(newUser.rows[0]);
      if (!newUser) {
        response
          .status(500)
          .send("Unknown error, please contact the developer.");
      }
      const newPasswordEntry = pool.query(
        "INSERT INTO passwords (user_id, pass) VALUES ($1, $2) RETURNING user_id",
        [newUser.rows[0].user_id, password]
      );
      console.log(newPasswordEntry);
      console.log(newPasswordEntry.rows[0]);
      if (!newPasswordEntry) {
        response
          .status(500)
          .send("Unknown error, please contact the developer.");
      }
      response.status(201).json(newUser);
    } else {
      const newUser = pool.query(
        "INSERT INTO users (email, first_name, last_name, course_id, acc_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [email, firstName, lastName, courseId, accId]
      );
      if (!newUser) {
        response
          .status(500)
          .send("Unknown error, please contact the developer.");
      }
      const newPasswordEntry = pool.query(
        "INSERT INTO passwords (user_id, pass) VALUES ($1, $2) RETURNING user_id",
        [newUser.rows[0].user_id, password]
      );
      if (!newPasswordEntry) {
        response
          .status(500)
          .send("Unknown error, please contact the developer.");
      }
      response.status(201).json(newUser);
    }
  } catch (e) {
    console.log(e.message);
    response.status(500).send(e);
  }
};

module.exports = {
  uploadProfilePic,
  getEventInfo,
  getUserStatus,
  getCourseInfo,
  getUsers,
  getUsersByCourse,
  getUsersByAccommodation,
  getUserBasicInfo,
  testFunction,
  getLoggedInUserBasicInfo,
  getLoggedInUserInterests,
  getAllEvents,
  getCourseUsers,
  getAccomInfo,
  getUserInterests,
  getAccomodationUsers,
  getLoggedInUserStatus,
  postStatus,
  insertEventInfo,
  getCourseMessages,
  getAccMessages,
  postCourseMessage,
  postAccMessage,
  createAccount,
};
