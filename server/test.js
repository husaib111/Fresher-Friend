const request = require("supertest");
const { server, serverTest } = require("./index");

describe("Server tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    serverTest.close();
    done();
  });

  test("Initial test", async () => {
    const response = await request(serverTest).get("/users");

    expect(response.statusCode).toBe(200);
  });

  test("Login test", async () => {
    const json = {
      body: {
        email: "txg071@student.bham.ac.uk",
        password: "MySecurePassword",
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await request(serverTest).post("/login").send(json);

    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
});
