const request = require("supertest");
const server = require("./index");
const Axios = require("axios");

describe("Server tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  test("Login test 1", async () => {
    const response = await Axios.post(
      "https://www.fresher-friend.bham.team:5001/login",
      {
        email: "txg071@student.bham.ac.uk",
        password: "MySecurePassword",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(response.statusCode).toBe(200);
  });
});
