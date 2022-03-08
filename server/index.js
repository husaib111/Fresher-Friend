const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./queries");
const auth = require("./auth");

const port = 5001;

//middleware

app.use(express.json()); //req.body
app.use(cors());

//routes

app.listen(port, () => {
  console.log("Server started on port %d", port);
});

app.post('/', async (req, res) => {
  res.send('Got a POST request')
})
app.get("/users", db.getUsers);
app.get("/users/courseId/:courseId", db.getUsersByCourse);
app.get("/users/accId/:addId", db.getUsersByAccomodation);
app.post("/login", auth.loginCheck);
