const request = require("supertest");
const server = require("./index");

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
  });
});
