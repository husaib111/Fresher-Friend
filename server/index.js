const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.listen(5001, () => {
  console.log("Server started on port 5001.");
});
