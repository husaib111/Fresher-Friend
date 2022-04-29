const { response } = require("express");
const pool = require("./dbconnect");

const getAuth = (request) => {
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
      //???
      response.status(200).send(request.body);
    } else if (method == "PUT") {
      const { username, password } = getAuth(request);

      if (!username || !password) {
        //401- Unauthorized (No credentials provided)
        response.status(401).send({
          error: "You have not provided authorization for POST request.",
        });
      }

      if (username == "admin" && password == "admin") {
        const { name, location, organiser, starttime, endtime } = request.body;
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
          const newEvent = await pool.query(
            "INSERT INTO event(event_name, location, organiser, starttime, endtime) VALUES ($1, $2, $3, $4, $5) RETURNING event_id",
            [name, location, user.rows[0].user_id, starttime, endtime]
          );
          //201- Created (Event successfully created)
          response.status(201).json(newEvent.rows);
        } else {
          //401- Unauthorized (Incorrect authorization credentials)
          response.status(401).send({
            error: "Your authorization is incorrect.",
          });
        }
      }
    } else if (method == "DELETE") {
      //???
    } else {
      //405 - Method Not Allowed
      response.status(405).send();
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500).send(e.message);
  }
};

const eventsByID = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const eventsByIDName = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const eventsByIDLocation = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const eventsByIDOrganiser = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const eventsByIDTime = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const eventsByIDInvites = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const eventsByIDInvitesUser = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

////////////////
//COURSE GROUPS//
////////////////

const courseGroups = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const courseGroupsByID = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const courseGroupsByIDName = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const courseGroupsByIDDuration = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const courseGroupsByIDMembers = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const courseGroupsByIDMembersID = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

////////////////
//ACCOMMODATION GROUPS//
////////////////

const accommodationGroups = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const accommodationGroupsByID = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const accommodationGroupsByIDLocation = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const accommodationGroupsByIDMembers = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const accommodationGroupsByIDMembersID = async (request, response) => {
  try {
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      //???
    } else if (method == "POST") {
      //???
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //handle wrong request method error
    }
  } catch (e) {
    //if there was an error, a correct status needs to be sent back
  }
};

const testAPI = async (request, response) => {
  response.status(200).json({
    option: request.params.option,
    variable: request.params.variable,
  });
};

module.exports = {
  //Events
  events,
  eventsByID,
  eventsByIDName,
  eventsByIDLocation,
  eventsByIDOrganiser,
  eventsByIDTime,
  eventsByIDInvites,
  eventsByIDInvitesUser,
  //Course Groups
  courseGroups,
  courseGroupsByID,
  courseGroupsByIDName,
  courseGroupsByIDDuration,
  courseGroupsByIDMembers,
  courseGroupsByIDMembersID,
  //Accommodation Groups
  accommodationGroups,
  accommodationGroupsByID,
  accommodationGroupsByIDLocation,
  accommodationGroupsByIDMembers,
  accommodationGroupsByIDMembersID,
  //Test
  testAPI,
};
