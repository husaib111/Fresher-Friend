const request = require("supertest");
const server = require("./index");

const config = {
  "Access-Control-Allow-Credentials": true,
  "Content-Type": "application/json",
};

describe("Login authentication tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    done();
  });

  test("Login test for valid user information 1", async () => {
    const json = {
      email: "txg071@student.bham.ac.uk",
      password: "MySecurePassword",
    };
    const response = await request(server)
      .post("/login")
      .set(config)
      .send(json);

    expect(response.body.success).toBe(true);
  });

  test("Login test for valid user information 2", async () => {
    const json = {
      email: "dxs111@student.bham.ac.uk",
      password: "Password123",
    };
    const response = await request(server)
      .post("/login")
      .set(config)
      .send(json);

    expect(response.body.success).toBe(true);
  });

  test("Login test for invalid user password", async () => {
    const json = {
      email: "txg071@student.bham.ac.uk",
      password: "IncorrectPassword",
    };
    const response = await request(server)
      .post("/login")
      .set(config)
      .send(json);

    expect(response.body.success).toBe(false);
  });

  test("Login test for invalid user email", async () => {
    const json = {
      email: "XXXXXX@student.bham.ac.uk",
      password: "MySecurePassword",
    };
    const response = await request(server)
      .post("/login")
      .set(config)
      .send(json);

    expect(response.body.success).toBe(false);
  });

  test("Login test for invalid user information", async () => {
    const json = {
      email: "incorrect@gmail.com",
      password: "incorrect",
    };
    const response = await request(server)
      .post("/login")
      .set(config)
      .send(json);

    expect(response.body.success).toBe(false);
  });
});

let session = null;

describe("Query tests", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    done();
  });

  test("Setup session token", async () => {
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
