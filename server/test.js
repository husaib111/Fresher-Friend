const request = require("supertest");
const app = require("./index");
const http = require("http");

const testingPort = 5002;

const server = http.createServer(app).listen(testingPort, () => {
  console.log("Server started on port %d", testingPort);
});

describe("Server tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  test("Initial test", async () => {
    const response = await request(server).get("/users");
    expect(response.statusCode).toBe(200);
    // expect();
  });

  // test("Login test", async () => {
  //   const json = {
  //     body: {
  //       email: "txg071@student.bham.ac.uk",
  //       password: "MySecurePassword",
  //     },
  //     withCredentials: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const response = await request(server).post("/login").send(json);

  //   console.log(response.body);
  //   expect(response.statusCode).toBe(200);
  // });
});
