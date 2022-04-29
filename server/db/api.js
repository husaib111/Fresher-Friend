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
    //find out which method was used
    const method = request.method;

    if (method == "GET") {
      const eventsList = await pool.query("SELECT * FROM event");
    } else if (method == "POST") {
      //check for authentication (student / admin)
      //create a new event
      //return status
    } else if (method == "PUT") {
      //???
    } else if (method == "DELETE") {
      //???
    } else {
      //405 - Method Not Allowed
      response.status(405);
    }
  } catch (e) {
    //500 - Internal Server Error
    response.status(500);
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
