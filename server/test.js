const request = require("supertest");
const db = require("./queries");

describe("Server tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    // server.close();
    done();
  });

  test("Initial test", async () => {
    const users = await db.getUsers();
    console.log(users);
    expect(users);
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
