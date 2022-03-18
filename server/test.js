const request = require("supertest");
const app = require("./index");

const server = app.listen(5002, () => {
  console.log("Server started on port 5002");
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
    const users = await request(server).get("/test1");
    console.log(users.body);
    expect(users.body.success);
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
