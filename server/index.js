const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./queries");

const port = 5001;

app.use(cors());
app.use(express.json()); //req.body

app.listen(port, () => {
  console.log("Server started on port %d", port);
});

app.get("/users", db.getUsers);
