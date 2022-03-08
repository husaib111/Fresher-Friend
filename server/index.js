const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./queries");

const port = 5001;

//middleware

app.use(express.json()); //req.body
app.use(cors());

//routes

app.listen(port, () => {
  console.log("Server started on port %d", port);
});

app.get("/users", db.getUsers);
app.get("/usersByCourse", db.getUsersByCourse);
