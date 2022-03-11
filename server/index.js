const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const db = require("./queries");
const auth = require("./auth");

require("./passport");

const port = 5001;

//middleware

app.use(express.json()); //req.body
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: "http://www.fresher-friend.bham.team",
    credentials: true,
  })
);

//routes

app.listen(port, () => {
  console.log("Server started on port %d", port);
});

app.get("/users", auth.userAuth, db.getUsers);
app.get("/users/courseId/:courseId", db.getUsersByCourse);
app.get("/users/accId/:accId", db.getUsersByAccommodation);
app.post("/login", auth.loginCheck);
app.get("/logout", auth.logOut);
app.get("/userInfo/:userId", db.getUserBasicInfo);

app.get("/test", db.testFunction);
app.get("/test2", db.testFunction2);
app.get("/testAuth", auth.userAuth);
