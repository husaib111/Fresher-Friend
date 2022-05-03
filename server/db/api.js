const { response } = require("express");
const pool = require("./dbconnect");

const SECRET = "admin";

const getAuth = (request) => {
  if (!request.headers.authorization) {
    return "error";
  }
  const username = Buffer.from(
    request.headers.authorization.split(" ")[1],
    "base64"
  )
    .toString()
    .split(":")[0];
  const password = Buffer.from(
    request.headers.authorization.split(" ")[1],
    "base64"
  )
    .toString()
    .split(":")[1];

  return { username, password };
};

////////////////
//EVENTS//
////////////////

const events = async (request, response) => {
  try {
    const method = request.method;

    if (method == "GET") {
      const eventsList = await pool.query("SELECT * FROM event");
      //200- OK (Events list sent)
      response.status(200).json(eventsList.rows);
    } else if (method == "POST") {
      //405 - Method Not Allowed (No support for POST)
      response
        .status(405)
        .send(
          "POST method not supported. Please use POST method for a specific event (api/v1/events/:id)."
        );
    } else if (method == "PUT") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for PUT request.");
      }

      if (username == "admin" && password == SECRET) {
        const { name, location, organiser, starttime, endtime } = request.body;
        if (!name || !location || !organiser || !starttime || !endtime) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing one or more parameters inside your body.");
        }
        const newEvent = await pool.query(
          "INSERT INTO event(event_name, location, organiser, starttime, endtime) VALUES ($1, $2, $3, $4, $5) RETURNING event_id",
          [name, location, organiser, starttime, endtime]
        );
        //201- Created (Event successfully created)
        response.status(201).json(newEvent.rows);
      } else {
        const user = await pool.query(
          "SELECT user_id, email, pass FROM users NATURAL JOIN passwords WHERE email = $1",
          [username + "@student.bham.ac.uk"]
        );

        if (user.rows[0].pass == password) {
          const { name, location, starttime, endtime } = request.body;
          if (!name || !location || !starttime || !endtime) {
            //400 - Bad Request (Missing body)
            response
              .status(400)
              .send("You are missing one or more parameters inside your body.");
          }
          const newEvent = await pool.query(
            "INSERT INTO event(event_name, location, organiser, starttime, endtime) VALUES ($1, $2, $3, $4, $5) RETURNING event_id",
            [name, location, user.rows[0].user_id, starttime, endtime]
          );
          //201- Created (Event successfully created)
          response.status(201).json(newEvent.rows);
        } else {
          //401- Unauthorized (Incorrect authorization credentials)
          response.status(401).send("Your authorization is incorrect.");
        }
      }
    } else if (method == "DELETE") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      }

      if (username == "admin" && password == SECRET) {
        await pool.query("TRUNCATE TABLE event");
        await pool.query("TRUNCATE TABLE invites");
        //201- Created (Event successfully created)
        response.status(200).send("Successfully deleted all events.");
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const eventsByID = async (request, response) => {
  try {
    const method = request.method;
    const { id } = request.params;

    if (method == "GET") {
      const event = await pool.query(
        "SELECT * FROM event WHERE event_id = $1",
        [id]
      );

      if (!event.rows[0]) {
        //404- Not Found (No event found with event_id)
        response.status(404).send("No event found for ID " + id + ".");
      }
      //200- OK (Event sent)
      response.status(200).json(event.rows[0]);
    } else if (method == "POST") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for POST request.");
      }

      if (username == "admin" && password == SECRET) {
        const { name, location, organiser, starttime, endtime } = request.body;
        if (!name || !location || !organiser || !starttime || !endtime) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing one or more parameters inside your body.");
        }

        const eventCheck = await pool.query(
          "SELECT * FROM event WHERE event_id = $1",
          [id]
        );

        if (!eventCheck.rows[0]) {
          //404 - Not Found (No event found with ID)
          response.status(404).send("No event with ID " + id + " found.");
        }

        const updatedEvent = await pool.query(
          "UPDATE event SET event_name = $1, location = $2, organiser = $3, starttime = $4, endtime = $5 WHERE event_id = $6 RETURNING *",
          [name, location, organiser, starttime, endtime, id]
        );
        //200- OK (Event successfully modified)
        response.status(200).json(updatedEvent.rows[0]);
      } else {
        const user = await pool.query(
          "SELECT user_id, email, pass FROM users NATURAL JOIN passwords WHERE email = $1",
          [username + "@student.bham.ac.uk"]
        );

        if (user.rows[0].pass == password) {
          const { name, location, starttime, endtime } = request.body;
          if (!name || !location || !starttime || !endtime) {
            //400 - Bad Request (Missing body)
            response
              .status(400)
              .send("You are missing one or more parameters inside your body.");
          }

          const userEvent = await pool.query(
            "SELECT * FROM event WHERE event_id = $1 AND organiser = $2",
            [id, user.rows[0].user_id]
          );

          if (!userEvent.rows[0]) {
            //404 - Not Found (No event found for user)
            response
              .status(404)
              .send(
                "No event with ID " + id + " found for user " + username + "."
              );
          }
          const updatedEvent = await pool.query(
            "UPDATE event SET event_name = $1, location = $2, starttime = $3, endtime = $4 WHERE event_id = $5 RETURNING *",
            [name, location, starttime, endtime, id]
          );
          //200- OK (Event successfully modified)
          response.status(200).json(updatedEvent.rows[0]);
        } else {
          //401- Unauthorized (Incorrect authorization credentials)
          response.status(401).send("Your authorization is incorrect.");
        }
      }
    } else if (method == "PUT") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "PUT method not allowed. For creating events, use /v1/events endpoint instead."
        );
    } else if (method == "DELETE") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      }

      if (username == "admin" && password == SECRET) {
        const event = await pool.query(
          "SELECT * FROM event WHERE event_id = $1",
          [id]
        );

        if (!event.rows[0]) {
          //404 - Not Found (No event found with ID)
          response.status(404).send("No event with ID " + id + " found.");
        }

        await pool.query("DELETE FROM event WHERE event_id = $1", [id]);
        //200- OK (Event successfully deleted)
        response
          .status(200)
          .send("Successfully deleted event with ID $1.", [id]);
      } else {
        const user = await pool.query(
          "SELECT user_id, email, pass FROM users NATURAL JOIN passwords WHERE email = $1",
          [username + "@student.bham.ac.uk"]
        );
        if ((user.rows[0].pass = password)) {
          const event = await pool.query(
            "SELECT * FROM event WHERE event_id = $1 AND organiser = $2",
            [id, user.rows[0].user_id]
          );

          if (!event.rows[0]) {
            //404 - Not Found (No event found with ID)
            response
              .status(404)
              .send(
                "No event for user " + username + " with ID " + id + " found."
              );
          }
          await pool.query("DELETE FROM event WHERE event_id = $1", [id]);
          //200- OK (Event successfully deleted)
          response
            .status(200)
            .send("Successfully deleted event with ID $1.", [id]);
        } else {
          //401- Unauthorized (Incorrect authorization credentials)
          response.status(401).send("Your authorization is incorrect.");
        }
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const eventsByIDEndpoint = async (request, response) => {
  try {
    const method = request.method;
    let { id, endpoint } = request.params;
    const endpoints = ["name", "location", "organiser", "starttime", "endtime"];

    if (endpoint == "invites") {
      eventsByIDInvites(request, response);
    }

    if (!endpoints.includes(endpoint)) {
      //400 - Bad Request (wrong endpoint, should not happen)
      response.status(400).send("Wrong endpoint requested.");
    }
    if (endpoint == "name") {
      endpoint = "event_name";
    }

    if (method == "GET") {
      const event = await pool.query(
        "SELECT $2 FROM event WHERE event_id = $1",
        [id, endpoint]
      );

      if (!event.rows[0]) {
        //404- Not Found (No event found with event_id)
        response.status(404).send("No event found for ID " + id + ".");
      }
      //200- OK (Event sent)
      response.status(200).json(event);
    } else if (method == "POST") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for POST request.");
      }

      if (username == "admin" && password == SECRET) {
        const { value } = request.body;
        if (!value) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing a new value inside your body.");
        }

        const eventCheck = await pool.query(
          "SELECT * FROM event WHERE event_id = $1",
          [id]
        );

        if (!eventCheck.rows[0]) {
          //404 - Not Found (No event found with ID)
          response.status(404).send("No event with ID " + id + " found.");
        }

        const updatedEvent = await pool.query(
          "UPDATE event SET $1 = $2 WHERE event_id = $3 RETURNING *",
          [endpoint, value, id]
        );
        //200- OK (Event successfully modified)
        response.status(200).json(updatedEvent.rows[0]);
      } else {
        const user = await pool.query(
          "SELECT user_id, email, pass FROM users NATURAL JOIN passwords WHERE email = $1",
          [username + "@student.bham.ac.uk"]
        );

        if (user.rows[0].pass == password) {
          const { value } = request.body;
          if (!value) {
            //400 - Bad Request (Missing body)
            response
              .status(400)
              .send("You are missing a new value inside your body.");
          }

          const userEvent = await pool.query(
            "SELECT * FROM event WHERE event_id = $1 AND organiser = $2",
            [id, user.rows[0].user_id]
          );

          if (!userEvent.rows[0]) {
            //404 - Not Found (No event found for user)
            response
              .status(404)
              .send(
                "No event with ID " + id + " found for user " + username + "."
              );
          }
          const updatedEvent = await pool.query(
            "UPDATE event SET $1 = $2 WHERE event_id = $3 RETURNING *",
            [endpoint, value, id]
          );
          //200- OK (Event successfully modified)
          response.status(200).json(updatedEvent.rows[0]);
        } else {
          //401- Unauthorized (Incorrect authorization credentials)
          response.status(401).send("Your authorization is incorrect.");
        }
      }
    } else if (method == "PUT") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "PUT method not allowed. For creating events, use /v1/events endpoint instead."
        );
    } else if (method == "DELETE") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "DELETE method not allowed. For deleting events, use /v1/events/:id endpoint instead."
        );
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const eventsByIDInvites = async (request, response) => {
  try {
    const method = request.method;
    const { id } = request.params;
    const { invitee } = request.body;
    const { username, password } = getAuth(request);
    const account = "PUBLIC";
    const user = {};

    if (username == "admin" && password == SECRET) {
      account = "ADMIN";
    } else {
      user = await pool.query(
        "SELECT user_id, email, pass FROM users NATURAL JOIN passwords WHERE email = $1",
        [username + "@student.bham.ac.uk"]
      );

      if (user.rows[0].pass == password) {
        account = "USER";
      } else if (username || password) {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    }
    if (method == "GET") {
      if (account == "PUBLIC") {
        const invites = await pool.query(
          "SELECT COUNT(*) FROM invites WHERE event_id = $1",
          [id]
        );
        if (invites.rows[0].count == 0) {
          //404- Not Found (No event found with event_id)
          response
            .status(404)
            .send("No event invites found for event ID " + id + ".");
        }

        //200- OK (Event invite count sent)
        response.status(200).json(invites.rows[0]);
      } else if (account == "ADMIN") {
        const invites = await pool.query(
          "SELECT * FROM invites NATURAL JOIN users WHERE event_id = $1",
          [id]
        );
        if (!invites.rows[0]) {
          //404- Not Found (No event found with event_id)
          response
            .status(404)
            .send("No event invites found for event ID " + id + ".");
        }

        //200- OK (Event invite count sent)
        response.status(200).json(invites.rows);
      } else if (account == "USER") {
        const invites = await pool.query(
          "SELECT invites.user_id, invites.event_id, users.first_name, users.middle_name FROM invites NATURAL JOIN users WHERE event_id = $1",
          [id]
        );
        const event = await pool.query(
          "SELECT * FROM event WHERE organizer = $1 AND event_id = $2",
          [user.rows[0].user_id, id]
        );
        if (!invites.rows[0] || !event.rows[0]) {
          //404- Not Found (No event found with event_id)
          response
            .status(404)
            .send("No event invites found with ID " + id + "for user ");
        }

        //200- OK (Event invite count sent)
        response.status(200).json(invites.rows);
      } else {
        //500 - Internal Server Error
        response
          .status(500)
          .send("Unreachable code. Please contact developer.");
      }
    } else if (method == "POST") {
      //405 - Method Not Allowed (No support for POST)
      response
        .status(405)
        .send(
          "POST method not allowed. For adding/deleting invites, use PUT/DELETE methods instead."
        );
    } else if (method == "PUT") {
      if (account == "PUBLIC") {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for PUT request.");
      } else if (account == "ADMIN") {
        if (!invitee) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing invitee(s) inside your body.");
        }
        const event = await pool.query(
          "SELECT * FROM event WHERE event_id = $1",
          [id]
        );
        if (!event.rows[0]) {
          //404- Not Found (No event found with event_id)
          response.status(404).send("No event found for ID " + id + ".");
        }
        const inviteCheck = await pool.query(
          "SELECT * FROM invites WHERE event_id = $1 AND user_id = $2",
          [id, invitee]
        );
        if (inviteCheck.rows[0]) {
          //409 - Conflict (invite already exists)
          response.status(409).send("Invite in event for user already exists.");
        }

        await pool.query(
          "INSERT INTO invites (user_id, event_id) VALUES ($1, $2)",
          [invitee, id]
        );
        //201 - Created
        response
          .status(201)
          .send(
            "User " + invitee + " has been successfully invited to the event."
          );
      } else if (account == "USER") {
        if (!invitee) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing invitee(s) inside your body.");
        }
        const event = await pool.query(
          "SELECT * FROM event WHERE event_id = $1 AND organizer = $2",
          [id, user.rows[0].user_id]
        );
        if (!event.rows[0]) {
          //404- Not Found (No event found with event_id)
          response
            .status(404)
            .send(
              "No event found with ID " + id + " for user " + username + "."
            );
        }
        const inviteCheck = await pool.query(
          "SELECT * FROM invites WHERE event_id = $1 AND user_id = $2",
          [id, invitee]
        );
        if (inviteCheck.rows[0]) {
          //409 - Conflict (invite already exists)
          response.status(409).send("Invite in event for user already exists.");
        }

        await pool.query(
          "INSERT INTO invites (user_id, event_id) VALUES ($1, $2)",
          [invitee, id]
        );
        //201 - Created
        response
          .status(201)
          .send(
            "User " + invitee + " has been successfully invited to the event."
          );
      } else {
        //500 - Internal Server Error
        response
          .status(500)
          .send("Unreachable code. Please contact developer.");
      }
    } else if (method == "DELETE") {
      if (account == "PUBLIC") {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      } else if (account == "ADMIN") {
        if (!invitee) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing invitee(s) inside your body.");
        }
        const event = await pool.query(
          "SELECT * FROM event WHERE event_id = $1",
          [id]
        );
        if (!event.rows[0]) {
          //404- Not Found (No event found with event_id)
          response.status(404).send("No event found for ID " + id + ".");
        }
        const invite = pool.query(
          "SELECT * FROM invites WHERE user_id = $1 AND event_id = $2",
          [invitee, id]
        );
        if (!invite.rows[0]) {
          //409 - Conflict (Invitee is not invited)
          response
            .status(409)
            .send(
              "Could not be deleted because invitee is not invited to the event."
            );
        }

        await pool.query(
          "DELETE FROM invites WHERE user_id = $1 AND event_id = $2",
          [invitee, id]
        );
        //200 - OK
        response
          .status(200)
          .send("Invitee successfully deleted from the event invites.");
      } else if (account == "USER") {
        if (!invitee) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing invitee(s) inside your body.");
        }
        const event = await pool.query(
          "SELECT * FROM event WHERE event_id = $1 AND organizer = $2",
          [id, user.rows[0].user_id]
        );
        if (!event.rows[0]) {
          //404- Not Found (No event found with event_id)
          response
            .status(404)
            .send(
              "No event found with ID " + id + " for user " + username + "."
            );
        }
        const invite = pool.query(
          "SELECT * FROM invites WHERE user_id = $1 AND event_id = $2",
          [invitee, id]
        );
        if (!invite.rows[0]) {
          //409 - Conflict (Invitee is not invited)
          response
            .status(409)
            .send(
              "Could not be deleted because invitee is not invited to the event."
            );
        }

        await pool.query(
          "DELETE FROM invites WHERE user_id = $1 AND event_id = $2",
          [invitee, id]
        );
        //200 - OK
        response
          .status(200)
          .send("Invitee successfully deleted from the event invites.");
      } else {
        //500 - Internal Server Error
        response
          .status(500)
          .send("Unreachable code. Please contact developer.");
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

////////////////
//COURSE GROUPS//
////////////////

const courseGroups = async (request, response) => {
  try {
    const method = request.method;

    if (method == "GET") {
      const courses = await pool.query("SELECT * FROM courses");
      //200- OK (Courses list sent)
      response.status(200).json(courses.rows);
    } else if (method == "POST") {
      //405 - Method Not Allowed (No support for POST)
      response
        .status(405)
        .send(
          "POST method not supported. Please use POST method for a specific course (api/v1/groups/courses/:id)."
        );
    } else if (method == "PUT") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for PUT request.");
      }

      if (username == "admin" && password == SECRET) {
        const { name, duration } = request.body;
        if (!name || !duration) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing one or more parameters inside your body.");
        }
        const newCourse = await pool.query(
          "INSERT INTO courses(course_name, duration) VALUES ($1, $2) RETURNING *",
          [name, duration]
        );
        //201- Created (Event successfully created)
        response.status(201).json(newCourse.rows);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else if (method == "DELETE") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      }

      if (username == "admin" && password == SECRET) {
        await pool.query("TRUNCATE TABLE courses");
        //200- Created (Event successfully created)
        response.status(200).send("Successfully deleted all courses.");
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const courseGroupsByID = async (request, response) => {
  try {
    const method = request.method;
    const { id } = request.params;

    if (method == "GET") {
      const course = await pool.query(
        "SELECT * FROM courses WHERE course_id = $1",
        [id]
      );

      if (!course.rows[0]) {
        //404- Not Found (No event found with event_id)
        response.status(404).send("No course found for ID " + id + ".");
      }
      //200- OK (Event sent)
      response.status(200).json(course.rows[0]);
    } else if (method == "POST") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for POST request.");
      }

      if (username == "admin" && password == SECRET) {
        const { name, duration } = request.body;
        if (!name || !duration) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing one or more parameters inside your body.");
        }

        const courseCheck = await pool.query(
          "SELECT * FROM courses WHERE course_id = $1",
          [id]
        );

        if (!courseCheck.rows[0]) {
          //404 - Not Found (No event found with ID)
          response.status(404).send("No course with ID " + id + " found.");
        }

        const updatedCourse = await pool.query(
          "UPDATE courses SET course_name = $1, duration = $2 WHERE course_id = $6 RETURNING *",
          [name, duration, id]
        );
        //200- OK (Event successfully modified)
        response.status(200).json(updatedCourse.rows[0]);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else if (method == "PUT") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "PUT method not allowed. For creating events, use /v1/groups/courses endpoint instead."
        );
    } else if (method == "DELETE") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      }

      if (username == "admin" && password == SECRET) {
        const course = await pool.query(
          "SELECT * FROM courses WHERE course_id = $1",
          [id]
        );

        if (!course.rows[0]) {
          //404 - Not Found (No event found with ID)
          response.status(404).send("No course with ID " + id + " found.");
        }

        await pool.query("DELETE FROM courses WHERE course_id = $1", [id]);
        //200- OK (Event successfully deleted)
        response
          .status(200)
          .send("Successfully deleted course with ID $1.", [id]);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const courseGroupsByIDEndpoint = async (request, response) => {
  try {
    const method = request.method;
    let { id, endpoint } = request.params;
    const endpoints = ["name", "duration"];

    if (!endpoints.includes(endpoint)) {
      //400 - Bad Request (wrong endpoint, should not happen)
      response.status(400).send("Wrong endpoint requested.");
    }
    if (endpoint == "name") {
      endpoint = "course_name";
    }

    if (method == "GET") {
      const course = await pool.query(
        "SELECT $2 FROM courses WHERE course_id = $1",
        [id, endpoint]
      );

      if (!course.rows[0]) {
        //404- Not Found (No course found with event_id)
        response.status(404).send("No course found for ID " + id + ".");
      }
      //200- OK (Course sent)
      response.status(200).json(course.rows[0]);
    } else if (method == "POST") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for POST request.");
      }

      if (username == "admin" && password == SECRET) {
        const { value } = request.body;
        if (!value) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing a new value inside your body.");
        }

        const courseCheck = await pool.query(
          "SELECT * FROM courses WHERE course_id = $1",
          [id]
        );

        if (!courseCheck.rows[0]) {
          //404 - Not Found (No event found with ID)
          response.status(404).send("No course with ID " + id + " found.");
        }

        const updatedCourse = await pool.query(
          "UPDATE courses SET $1 = $2 WHERE course_id = $3 RETURNING *",
          [endpoint, value, id]
        );
        //200- OK (Event successfully modified)
        response.status(200).json(updatedCourse.rows[0]);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else if (method == "PUT") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "PUT method not allowed. For creating events, use /v1/groups/courses endpoint instead."
        );
    } else if (method == "DELETE") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "DELETE method not allowed. For deleting events, use /v1/groups/courses/:id endpoint instead."
        );
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

////////////////
//ACCOMMODATION GROUPS//
////////////////

const accommodationGroups = async (request, response) => {
  try {
    const method = request.method;

    if (method == "GET") {
      const accommodation = await pool.query("SELECT * FROM accommodation");
      //200- OK (Courses list sent)
      response.status(200).json(accommodation.rows);
    } else if (method == "POST") {
      //405 - Method Not Allowed (No support for POST)
      response
        .status(405)
        .send(
          "POST method not supported. Please use POST method for a specific course (api/v1/groups/accommodation/:id)."
        );
    } else if (method == "PUT") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for PUT request.");
      }

      if (username == "admin" && password == SECRET) {
        const { flat, block, location } = request.body;
        if (!flat || !block || !location) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing one or more parameters inside your body.");
        }
        const newAccommodation = await pool.query(
          "INSERT INTO accommodation(flat_num, block_num, acc_location) VALUES ($1, $2, $3) RETURNING *",
          [flat, block, location]
        );
        //201- Created (Event successfully created)
        response.status(201).json(newAccommodation.rows);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else if (method == "DELETE") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      }

      if (username == "admin" && password == SECRET) {
        await pool.query("TRUNCATE TABLE accommodation");
        //200- Created (Event successfully created)
        response.status(200).send("Successfully deleted all accommodation.");
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const accommodationGroupsByID = async (request, response) => {
  try {
    const method = request.method;
    const { id } = request.params;

    if (method == "GET") {
      const accommodation = await pool.query(
        "SELECT * FROM accommodation WHERE acc_id = $1",
        [id]
      );

      if (!accommodation.rows[0]) {
        //404- Not Found (No event found with event_id)
        response.status(404).send("No accommodation found for ID " + id + ".");
      }
      //200- OK (Event sent)
      response.status(200).json(accommodation.rows[0]);
    } else if (method == "POST") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for POST request.");
      }

      if (username == "admin" && password == SECRET) {
        const { flat, block, location } = request.body;
        if (!flat || !block || !location) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing one or more parameters inside your body.");
        }

        const accCheck = await pool.query(
          "SELECT * FROM accommodation WHERE acc_id = $1",
          [id]
        );

        if (!accCheck.rows[0]) {
          //404 - Not Found (No event found with ID)
          response
            .status(404)
            .send("No accommodation with ID " + id + " found.");
        }

        const updatedAcc = await pool.query(
          "UPDATE accommodation SET flat_num = $1, block_num = $2, acc_location = $3 WHERE acc_id = $6 RETURNING *",
          [flat, block, location, id]
        );
        //200- OK (Event successfully modified)
        response.status(200).json(updatedAcc.rows[0]);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else if (method == "PUT") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "PUT method not allowed. For creating events, use /v1/groups/accommodation endpoint instead."
        );
    } else if (method == "DELETE") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for DELETE request.");
      }

      if (username == "admin" && password == SECRET) {
        const accommodation = await pool.query(
          "SELECT * FROM accommodation WHERE acc_id = $1",
          [id]
        );

        if (!accommodation.rows[0]) {
          //404 - Not Found (No event found with ID)
          response
            .status(404)
            .send("No accommodation with ID " + id + " found.");
        }

        await pool.query("DELETE FROM accommodation WHERE acc_id = $1", [id]);
        //200- OK (Event successfully deleted)
        response
          .status(200)
          .send("Successfully deleted accommodation with ID $1.", [id]);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const accommodationGroupsByIDEndpoint = async (request, response) => {
  try {
    const method = request.method;
    let { id, endpoint } = request.params;
    const endpoints = ["flat", "block", "location"];

    if (!endpoints.includes(endpoint)) {
      //400 - Bad Request (wrong endpoint, should not happen)
      response.status(400).send("Wrong endpoint requested.");
    }
    if (endpoint == "flat") {
      endpoint = "flat_num";
    }
    if (endpoint == "block") {
      endpoint = "block_num";
    }
    if (endpoint == "location") {
      endpoint = "acc_location";
    }

    if (method == "GET") {
      const accommodation = await pool.query(
        "SELECT $2 FROM accommodation WHERE acc_id = $1",
        [id, endpoint]
      );

      if (!accommodation.rows[0]) {
        //404- Not Found (No location found with event_id)
        response.status(404).send("No accommodation found for ID " + id + ".");
      }
      //200- OK (Course sent)
      response.status(200).json(accommodation.rows[0]);
    } else if (method == "POST") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response
          .status(401)
          .send("You have not provided authorization for POST request.");
      }

      if (username == "admin" && password == SECRET) {
        const { value } = request.body;
        if (!value) {
          //400 - Bad Request (Missing body)
          response
            .status(400)
            .send("You are missing a new value inside your body.");
        }

        const accCheck = await pool.query(
          "SELECT * FROM accommodation WHERE acc_id = $1",
          [id]
        );

        if (!accCheck.rows[0]) {
          //404 - Not Found (No accommodation found with ID)
          response
            .status(404)
            .send("No accommodation with ID " + id + " found.");
        }

        const updatedAccommodation = await pool.query(
          "UPDATE accommodation SET $1 = $2 WHERE acc_id = $3 RETURNING *",
          [endpoint, value, id]
        );
        //200- OK (Event successfully modified)
        response.status(200).json(updatedAccommodation.rows[0]);
      } else {
        //401- Unauthorized (Incorrect authorization credentials)
        response.status(401).send("Your authorization is incorrect.");
      }
    } else if (method == "PUT") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "PUT method not allowed. For creating events, use /v1/groups/accommodation endpoint instead."
        );
    } else if (method == "DELETE") {
      //405 - Method Not Allowed (No support for PUT)
      response
        .status(405)
        .send(
          "DELETE method not allowed. For deleting events, use /v1/groups/accommodation/:id endpoint instead."
        );
    } else {
      //501 - Not Implemented
      response.status(501).send("Requested method is not yet supported.");
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

module.exports = {
  //Events
  events,
  eventsByID,
  eventsByIDEndpoint,
  eventsByIDInvites,
  //Course Groups
  courseGroups,
  courseGroupsByID,
  courseGroupsByIDEndpoint,
  //Accommodation Groups
  accommodationGroups,
  accommodationGroupsByID,
  accommodationGroupsByIDEndpoint,
};
