const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); //req.body

app.get("",async(req,res) => {
  try {
    //
  } catch (e) {
    console.error(e.message);
  }
});

app.post("",async(req,res) => {
  try {
    //
  } catch (e) {
    console.error(e.message);
  }
});

app.put("",async(req,res) => {
  try {
    //
  } catch (e) {
    console.error(e.message);
  }
});

app.delete("",async(req,res) => {
  try {
    //
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001.");
});
