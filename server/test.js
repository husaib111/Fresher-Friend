const request = require("supertest");
const server = require("./index");

describe("Our server", () => {
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
