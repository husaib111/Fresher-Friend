const http = require("http");
const app = require("./index");

const port = 5002;

const server = http.createServer(app).listen(port, () => {
  console.log("Server started on port %d", port);
});
