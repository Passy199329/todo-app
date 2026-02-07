const request = require("supertest");
const app = require("../src/app");

describe("Auth Tests", () => {
  it("should load register page", async () => {
    const res = await request(app).get("/register");
    expect(res.statusCode).toBe(200);
  });

  it("should load login page", async () => {
    const res = await request(app).get("/login");
    expect(res.statusCode).toBe(200);
  });
});
