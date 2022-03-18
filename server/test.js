const request = require("supertest");
const app = require("./index");

const PORT = 5002;

const server = app.listen(PORT, () => {
  console.log("Server started on port %d", PORT);
});

const config = {
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

let session = null;

describe("Server tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    try {
      server.close();
      done();
    } catch (e) {
      console.log(e.message);
      done();
    }
  });

  test("Initial test", async () => {
    const users = await request(server).get("/test1");
    console.log(users.body);
    expect(users.body.success);
  });

  test("Login test", async () => {
    const json = {
      email: "txg071@student.bham.ac.uk",
      password: "MySecurePassword",
    };
    const response = await request(server)
      .post("/login")
      .set(config)
      .send(json);

    const tokenValue = await response.headers["set-cookie"][0]
      .split(",")
      .map((item) => item.split(";")[0])[0]
      .split("=")[1];

    session = {
      token: tokenValue,
    };
    console.log(session);
    expect(response.statusCode).toBe(200);
  });
});
