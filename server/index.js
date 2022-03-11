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
app.use(function (request, response, next) {
  response.header(
    "Access-Control-Allow-Origin",
    "http://www.fresher-friend.bham.team"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  response.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(
  cors({
    origin: "http://www.fresher-friend.bham.team",
    preflightContinue: true,
    credentials: true,
    allowedHeaders: "*",
  })
);

//routes

app.listen(port, () => {
  console.log("Server started on port %d", port);
});

app.get("/users", auth.userAuth, db.getUsers);
app.get("/users/courseId/:courseId", db.getUsersByCourse);
app.get("/users/accId/:addId", db.getUsersByAccommodation);
app.post("/login", auth.loginCheck);
app.get("/logout", auth.logOut);
