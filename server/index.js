const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./queries");
const auth = require("./auth");
const fs = require("fs");
const https = require("https");

require("./passport");

//middleware

app.use(express.json()); //req.body
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: "https://www.fresher-friend.bham.team",
    credentials: true,
  })
);

// const server = http.createServer(app).listen(port);

// const serverTest = app.listen(5002, () => {
//   console.log("Server started on port 5002");
// });

//routes
app.post("/login", auth.loginCheck);
app.get("/logout", auth.logOut);
app.get("/courseUsers", auth.userAuth, db.getCourseUsers);
app.get("/loggedInUserInfo", auth.userAuth, db.getLoggedInUserBasicInfo);
app.get("/loggedInUserInterests", auth.userAuth, db.getLoggedInUserInterests);

//USED FOR TESTING, DO NOT USE FOR PRODUCTION
app.get("/users", db.getUsers);
app.get("/users/courseId/:courseId", db.getUsersByCourse);
app.get("/users/accId/:accId", db.getUsersByAccommodation);
app.get("/userInfo/:userId", db.getUserBasicInfo);
app.get("/test", auth.userAuth, db.testFunction);

app.get("/test1", (request, response) => {
  response.json({ success: true });
});

module.exports = app;
