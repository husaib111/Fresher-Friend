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

const port = 5001;

const options = {
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/fresher-friend.bham.team/fullchain.pem"
  ),
  key: fs.readFileSync(
    "/etc/letsencrypt/live/fresher-friend.bham.team/privkey.pem"
  ),
};

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

//routes

const server = https.createServer(options, app).listen(port, () => {
  console.log("Server started on port %d", port);
});
const serverTest = app.listen(port + 1, () => {
  console.log("Server started on port %d", port + 1);
});

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

module.exports = [server, serverTest];
