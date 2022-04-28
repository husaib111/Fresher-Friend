const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./db/queries");
const api = require("./db/api");
const auth = require("./db/auth");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


require("./db/passport");

//middleware

app.use(express.json()); //req.body
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: [
      "https://www.fresher-friend.bham.team",
      "https://fresher-friend.bham.team",
    ],
    credentials: true,
  })
);

//routes
app.post("/profile",auth.userAuth, upload.single("selectedFile"), db.uploadProfilePic);
app.post("/login", auth.loginCheck);
app.post("/setStatus", auth.userAuth, db.postStatus);
app.get("/logout", auth.logOut);
app.get("/courseUsers", auth.userAuth, db.getCourseUsers);
app.get("/accommodationUsers", auth.userAuth, db.getAccomodationUsers);
app.get("/loggedInUserInfo", auth.userAuth, db.getLoggedInUserBasicInfo);
app.get("/loggedInUserInterests", auth.userAuth, db.getLoggedInUserInterests);
app.get("/loggedInUserStatus", auth.userAuth, db.getLoggedInUserStatus);
app.get("/courseInfo", auth.userAuth, db.getCourseInfo);
app.get("/accomInfo", auth.userAuth, db.getAccomInfo);
app.get("/eventInfo/:event_id", auth.userAuth, db.getEventInfo);
app.post("/insertEvent", auth.userAuth, db.insertEventInfo);
app.get("/getEvents", auth.userAuth, db.getAllEvents);

app.get("/getCourseMessages", auth.userAuth, db.getCourseMessages);
app.get("/getAccMessages", auth.userAuth, db.getAccMessages);
app.post("/postCourseMessage", auth.userAuth, db.postCourseMessage);
app.post("/postAccMessage", auth.userAuth, db.postAccMessage);

// REST API section //

//Events object
app.all("/api/v1/events", api.events);
app.all("/api/v1/events/:event_id", api.eventsByID);
app.all("/api/v1/events/:event_id/name", api.eventsByIDName);
app.all("/api/v1/events/:event_id/location", api.eventsByIDLocation);
app.all("/api/v1/events/:event_id/organiser", api.eventsByIDOrganiser);
app.all("/api/v1/events/:event_id/time", api.eventsByIDTime);
app.all("/api/v1/events/:event_id/invites", api.eventsByIDInvites);
app.all("/api/v1/events/:event_id/invites/:user_id", api.eventsByIDInvitesUser);

//Course groups object
app.all("/api/v1/groups/courses", api.courseGroups);
app.all("/api/v1/groups/courses/:course_id", api.courseGroupsByID);
app.all("/api/v1/groups/courses/:course_id/name", api.courseGroupsByIDName);
app.all(
  "/api/v1/groups/courses/:course_id/duration",
  api.courseGroupsByIDDuration
);
app.all(
  "/api/v1/groups/courses/:course_id/members",
  api.courseGroupsByIDMembers
);
app.all(
  "/api/v1/groups/courses/:course_id/members/:member_id",
  api.courseGroupsByIDMembersID
);

//Accommodation groups object
app.all("/api/v1/groups/accommodation", api.accommodationGroups);
app.all("/api/v1/groups/accommodation/:acc_id", api.accommodationGroupsByID);
app.all(
  "/api/v1/groups/accommodation/:acc_id/location",
  api.accommodationGroupsByIDLocation
);
app.all(
  "/api/v1/groups/accommodation/:acc_id/members",
  api.accommodationGroupsByIDMembers
);
app.all(
  "/api/v1/groups/accommodation/:acc_id/members/:member_id",
  api.accommodationGroupsByIDMembersID
);

//USED FOR TESTING, DO NOT USE FOR PRODUCTION
app.get("/users", db.getUsers);
app.get("/users/courseId/:courseId", db.getUsersByCourse);
app.get("/users/accId/:accId", db.getUsersByAccommodation);
app.get("/userStatus/:userId", db.getUserStatus);
app.get("/userInfo/:userId", db.getUserBasicInfo);
app.get("/test", auth.userAuth, db.testFunction);
app.get("/userInterests/:userId", db.getUserInterests);

module.exports = app;
