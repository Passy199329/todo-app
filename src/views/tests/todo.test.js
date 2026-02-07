const request = require("supertest");
const app = require("../src/app");

describe("Todo Tests", () => {
  it("should redirect unauthenticated user", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(302);
  });
});
