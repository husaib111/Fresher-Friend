const fs = require("fs");
const https = require("https");
const http = require("http");
const app = require("./index");

const port = 5001;

// const options = {
//   cert: fs.readFileSync(
//     "/etc/letsencrypt/live/fresher-friend.bham.team/fullchain.pem"
//   ),
//   key: fs.readFileSync(
//     "/etc/letsencrypt/live/fresher-friend.bham.team/privkey.pem"
//   ),
// };

// const server = https.createServer(options, app).listen(port, () => {
const server = http.createServer(app).listen(port, () => {
  console.log("Server started on port %d", port);
});
