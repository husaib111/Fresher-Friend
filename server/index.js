const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./db/queries");
const auth = require("./db/auth");

require("./db/passport");

//middleware

app.use(express.json()); //req.body
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: "https://www.fresher-friend.bham.team",
    // origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes
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

//USED FOR TESTING, DO NOT USE FOR PRODUCTION
app.get("/users", db.getUsers);
app.get("/users/courseId/:courseId", db.getUsersByCourse);
app.get("/users/accId/:accId", db.getUsersByAccommodation);
app.get("/userStatus/:userId",db.getUserStatus);
app.get("/userInfo/:userId", db.getUserBasicInfo);
app.get("/test", auth.userAuth, db.testFunction);
app.get("/userInterests/:userId",db.getUserInterests);

module.exports = app;
