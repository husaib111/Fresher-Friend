const fs = require("fs");
const https = require("https");
const app = require("./index");
require("dotenv").config();

const port = process.env.SERVER_PORT;

const options = {
  cert: fs.readFileSync(
    process.env.OPTION_CERT_PATH
  ),
  key: fs.readFileSync(
    process.env.OPTION_KEY_PATH
  ),
};

const server = https.createServer(options, app).listen(port, () => {
  // const server = http.createServer(app).listen(port, () => {
  console.log("Server started on port %d", port);
});
