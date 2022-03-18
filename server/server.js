const fs = require("fs");
const https = require("https");

const port = 5001;

const options = {
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/fresher-friend.bham.team/fullchain.pem"
  ),
  key: fs.readFileSync(
    "/etc/letsencrypt/live/fresher-friend.bham.team/privkey.pem"
  ),
};

const server = https.createServer(options, app).listen(port, () => {
  console.log("Server started on port %d", port);
});

module.exports = server;
