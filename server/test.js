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

describe("Server tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
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

    console.log(response);
    expect(response.statusCode).toBe(200);
  });
});
